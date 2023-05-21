const jwt = require("jsonwebtoken");
const EmailVerificationToken = require("../models/emailVerificationToken");
const PasswordResetToken = require("../models/passwordResetToken");
const User = require("../models/user");
const { isValidObjectId } = require("mongoose");
const { generateOTP, generateMailTransporter } = require("../utils/mail");
const { sendError, generateRandomByte } = require("../utils/helper");

// The await keyword can only be used inside an async function
// async before a function makes the function return a promise
// await makes the function pause the execution and wait for a resolved promise before it continues
// It restricts the db can move forward only if it receives a brand new user
exports.create = async (req, res) => {
  const { name: name, email: email, password: password } = req.body;

  /**
     * prevent the duplicate user by finding user with same email: same email means same user
     , and different email mail different users
     */
  const oldUser = await User.findOne({ email });
  if (oldUser) return sendError(res, "This email is already in use!");

  // create a brand new user with name  email , and password
  const newUser = new User({ name, email, password });
  // save the brand new user in mongodb
  await newUser.save();

  //generated 6 digits OTP
  let OTP = generateOTP();
  //store OTP inside our db
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  //send OTP to our user
  var transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: newUser.email,
    subject: "Email Verification",
    html: `
            <p>Your verification OTP</p>
            <h1>${OTP}</h1>
        `,
  });

  // get the resp json data request by the user with ID generated by mongodb
  res
    .status(201)
    .json({
      message:
        "Please verify your email. OTP has been sent to your email account!",
    });
};

exports.verifyEmail = async (req, res) => {
  // need userId and 6 digit OTP code to do email verification
  const { userId, OTP } = req.body;

  // check userId valid or not
  if (!isValidObjectId(userId)) return res.json({ error: "Invalid user id!" });

  // check user existance by user_id and user verification condition
  const user = await User.findById(userId);
  if (!user) return sendError(res, "User not found!", 404);
  if (user.isVerified) return sendError(res, "User is already verified");

  // find the token with given user id from user
  const token = await EmailVerificationToken.findOne({ owner: userId });
  if (!token) return sendError(res, "Token not found");

  // compare OTP in db and user entered
  const isMatched = await token.compareToken(OTP);
  if (!isMatched) return sendError(res, "Please submit a valid OTP!");

  user.isVerified = true;
  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  //send OTP to our user
  var transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: user.email,
    subject: "Welcome Email",
    html: "<h1>Welcome to our app and thanks for choosing us</h1>",
  });

  res.json({ messsage: "Your email is verified!" });
};

/*
If user not verify their email account after 1 hour, the email verification token will become invalid
when user wants to resend a email verification again. 
*/
exports.resendEmailVerificationToken = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return sendError(res, "User not found!");
  if (user.isVerified) return sendError(res, "Email id is already verified");

  const alreadyHasToken = await EmailVerificationToken.findOne({
    owner: userId,
  });
  if (alreadyHasToken)
    return sendError(
      res,
      "Only after one hour you can request for another token"
    );

  //generated 6 digits OTP
  let OTP = generateOTP();
  //store OTP inside our db
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: user._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  //send OTP to our user
  var transport = generateMailTransporter();

  transport.sendMail({
    from: "verification@reviewapp.com",
    to: user.email,
    subject: "Email Verification",
    html: `
            <p>Your verification OTP</p>
            <h1>${OTP}</h1>
        `,
  });

  res.json({ messsage: "New OTP has been sent to your email account!" });
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return sendError(res, "Email is missing!");

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "User not found!", 404);

  const alreadyHasToken = await PasswordResetToken.findOne({ owner: user._id });
  if (alreadyHasToken)
    return sendError(
      res,
      "Only after one hour you can request for another token!"
    );

  const token = await generateRandomByte();
  const newPasswordToken = await PasswordResetToken({ owner: user._id, token });
  await newPasswordToken.save();

  const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}&id=${user._id}`;

  //send OTP to our user
  var transport = generateMailTransporter();

  transport.sendMail({
    from: "security@reviewapp.com",
    to: user.email,
    subject: "Reset Password Link",
    html: `
            <p>Click here to change password</p>
            <a href='${resetPasswordUrl}'>Change Password</a>
        `,
  });

  res.json({ message: "Link sent to your email!" });
};

exports.sendResetPasswordTokenStatus = (req, res) => {
  res.json({ valid: true });
};

exports.resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;

  const user = await User.findById(userId);
  const matched = await user.comparePassword(newPassword);
  if (matched)
    return sendError(
      res,
      "The new password must be different from the old one!"
    );

  user.password = newPassword;

  //delete the Password reset token in the db
  await PasswordResetToken.findByIdAndDelete(req.resetToken._id);

  //send OTP to our user
  var transport = generateMailTransporter();

  transport.sendMail({
    from: "security@reviewapp.com",
    to: user.email,
    subject: "Password Reset Successfully",
    html: `
            <h1>Password Reset Successfully</h1>
            <p>Now you can use new password.</p>
        `,
  });

  res.json({
    message: "Password Reset Successfully! Now you can use new password.",
  });
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "Email/Password mismatch!");

  const matched = await user.comparePassword(password);
  if (!matched) return sendError(res, "Email/Password mismatch!");

  const { _id, name } = user;

  //found user and pwd matched
  const jwtToekn = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET
  );

  res.json({ user: { id: _id, name, email, token: jwtToekn } });
};