const nodemailer = require("nodemailer")

exports.generateOTP = (OTP_length = 6) => {
    let OTP = "";
    for (let i = 1; i <= OTP_length ; i++) {
        const randomValue = Math.round(Math.random()*9);
        OTP += randomValue;
        
    }
    return OTP;
}

exports.generateMailTransporter = () =>
    nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "82b56c98c18de6",
            pass: "1bf6b8603d96fc"
        }
        });
