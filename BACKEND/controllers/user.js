const nodemailer = require('nodemailer')
const EmailVerificationToken = require('../models/emailVerificationToken');
const User = require('../models/user');
const { isValidObjectId } = require('mongoose');
const { generateOTP, generateMailTransporter } = require('../utils/mail');
const { sendErrors } = require('../utils/helper');



// The await keyword can only be used inside an async function
// async before a function makes the function return a promise
// await makes the function pause the execution and wait for a resolved promise before it continues
// It restricts the db can move forward only if it receives a brand new user
exports.create = async (req, res) => {

    const {name:name, email:email, password:password} = req.body

    /**
     * prevent the duplicate user by finding user with same email: same email means same user
     , and different email mail different users
     */ 
    const oldUser = await User.findOne({ email });
    if (oldUser) return sendErrors(res, "This email is already in use!")

    // create a brand new user with name  email , and password
    const newUser = new User({name, email, password})
    // save the brand new user in mongodb
    await newUser.save()

    //generated 6 digits OTP
    let OTP = generateOTP()
    //store OTP inside our db
    const newEmailVerificationToken = new EmailVerificationToken({
        owner: newUser._id,
        token: OTP,
    })

    await newEmailVerificationToken.save()

    //send OTP to our user
    var transport =  generateMailTransporter()
    
    transport.sendMail({
        from:'verification@reviewapp.com',
        to: newUser.email,
        subject: 'Email Verification',
        html: `
            <p>Your verification OTP</p>
            <h1>${OTP}</h1>
        `
        ,
    })

    // get the resp json data request by the user with ID generated by mongodb
    res.status(201).json({message:"Please verify your email. OTP has been sent to your email account!"})
}

exports.verifyEmail = async (req, res) =>{
    // need userId and 6 digit OTP code to do email verification
    const{userId, OTP} = req.body;

    // check userId valid or not 
    if (!isValidObjectId(userId)) return res.json({error:"Invalid user id!"})  

    // check user existance by user_id and user verification condition
    const user = await User.findById(userId);
    if(!user) return sendErrors(res,"User not found!",404) 
    if(user.isVerified) return  sendErrors(res,"User is already verified") 

    // find the token with given user id from user
    const token = await EmailVerificationToken.findOne({owner:userId})
    if(!token) return sendErrors(res,"Token not found") 

    // compare OTP in db and user entered
    const isMatched = await token.compareToken(OTP)
    if(!isMatched)  return sendErrors(res,"Please submit a valid OTP!")  

    user.isVerified = true
    await user.save()

    await EmailVerificationToken.findByIdAndDelete(token._id)

    //send OTP to our user
    var transport = generateMailTransporter();
        
    transport.sendMail({
        from:'verification@reviewapp.com',
        to: user.email,
        subject: 'Welcome Email',
        html: `
            <p>Welcome to our app and thanks for choosing us</p>
        `
    })

    res.json({messsage:'Your email is verified!'})

}

/*
If user not verify their email account after 1 hour, the email verification token will become invalid
when user wants to resend a email verification again. 
*/
exports.resendEmailVerificationToken = async (req,res) => {
    const {userId} = req.body;

    const user = await User.findById(userId);
    if(!user) return sendErrors(res,"User not found!") 
    if(user.isVerified) return sendErrors(res,"Email id is already verified")  

    const alreadyHasToken = await EmailVerificationToken.findOne({owner:userId})
    if(alreadyHasToken) return sendErrors(res,"Only after one hour you can request for another token")  
    
    //generated 6 digits OTP
    let OTP = generateOTP();
    //store OTP inside our db
    const newEmailVerificationToken = new EmailVerificationToken({
        owner: user._id,
        token: OTP,
    })

    await newEmailVerificationToken.save();

    //send OTP to our user
    var transport =  generateMailTransporter();
    
    transport.sendMail({
        from:'verification@reviewapp.com',
        to: user.email,
        subject: 'Email Verification',
        html: `
            <p>Your verification OTP</p>
            <h1>${OTP}</h1>
        `
        ,
    })

    res.json({messsage:'New OTP has been sent to your email account!'});

}





