import React, { useEffect, useRef, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import Container from "../Container";
import Submit from "../form/Submit";
import Title from "../form/Title";
import FormContainer from "./FormContainer";
import { commonModalClasses } from "../../utils/theme";
import { verifyUserEmail } from "../../api/auth";
import { useNotification } from "../../hooks";

const OTP_LENGTH = 6;
let currentOTPIndex;

const isValidOTP = (otp) => {
  let valid = false;

  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }
  return valid;
};

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));

  // when type input this makes input arrays to a single input(wired) issue.
  // one solution is providing a reference to next input as reference hook
  const [activeOptIndex, setActiveOptIndex] = useState(0);

  const inputRef = useRef();
  const {updateNotification} = useNotification();

  //useLocation returns the current user's state from signup to email verification
  const { state } = useLocation();
  const user = state?.user;

  const navigate = useNavigate();

  

  //move OTP number forward
  const focusNextInputField = (index) => {
    setActiveOptIndex(index + 1);
  };

  //move OTP number backward
  const focusBackInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;
    setActiveOptIndex(nextIndex);
  };

  const handleKeyDown = ({ key }, index) => {
    currentOTPIndex = index;
    if (key === "Backspace") {
      focusBackInputField(currentOTPIndex);
    }
    if (key === 13) {
      focusNextInputField(currentOTPIndex);
    }
  };

  //dynamically track OTP and limit OTP 1 number per field
  const handleOtpChange = ({ target }) => {
    const { value } = target;
    const newOtp = [...otp];
    newOtp[currentOTPIndex] = value.substring(value.length - 1, value.length);

    if (!value) focusBackInputField(currentOTPIndex);
    else focusNextInputField(currentOTPIndex);

    setOtp([...newOtp]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidOTP(otp)) {
      return updateNotification("error", "invalid OTP");
    }
    console.log(otp);

    //submit OTP
    const { error, message } = await verifyUserEmail({
      OTP: otp.join(''),
      userId: user.id,
    });
    if (error) return updateNotification("errror",error);

    updateNotification("success",message);
  };

  /*
   due to every input OTP number is empty before a user's keystroke, '?' marks access the object's(on the left)
   properity. It returns undefined when obj is empty and obj is false. \
   input focus dependent on the change of activeOptIndex 
  */
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOptIndex]);

  /**
   * if user goes to verification before they signup. A not found page
   * will prevent not signup user goes to Email verifcation page
   */
  useEffect(() => {
    if (!user) navigate("/not-found");
  }, [user]);

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses}>
          <div>
            <Title>Please Enter the OTP to verify your account</Title>
            <p className="text-center dark:text-dark-subtle text-light-subtle">
              OTP has been sent to your email
            </p>
          </div>

          <div className="flex justify-center items-center space-x-4">
            {/* _ means key in the OTP array is empty, but still key the value of arr as index  */}
            {otp.map((_, index) => {
              return (
                <input
                  ref={activeOptIndex === index ? inputRef : null}
                  key={index}
                  type="number"
                  value={otp[index] || ""}
                  onChange={handleOtpChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary rounded 
                bg-transparent outline-none text-center dark:text-white text-primary font-semibold text-xl"
                />
              );
            })}
          </div>

          <Submit value="Verify Account"></Submit>
        </form>
      </Container>
    </FormContainer>
  );
}
