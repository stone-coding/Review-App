const express = require('express');
const { create, verifyEmail, resendEmailVerificationToken, forgetPassword, sendResetPasswordTokenStatus, resetPassword } = require('../controllers/user');
const { useValidtor, validate, validatePassword } = require('../middlewares/validator');
const { isValidPasswordResetToken } = require('../middlewares/user');


const router = express.Router();

router.post("/create",useValidtor,validate, create)
router.post("/verify-email", verifyEmail)
router.post("/resend-email-verification-token",resendEmailVerificationToken)
router.post("/forget-password",forgetPassword)
router.post("/verify-password-reset-token",isValidPasswordResetToken, sendResetPasswordTokenStatus)
router.post("/reset-password",validatePassword, validate, isValidPasswordResetToken, resetPassword)


module.exports = router;