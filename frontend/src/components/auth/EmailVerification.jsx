import React, { useEffect, useRef, useState } from "react";
import Container from "../Container";
import Submit from "../form/Submit";
import Title from "../form/Title";

const OTP_LENGTH = 6;
let currentOTPIndex;

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));

  // when type input this makes input arrays to a single input(wired) issue.
  // one solution is providing a reference to next input as reference hook
  const [activeOptIndex, setActiveOptIndex] = useState(0);

  const inputRef = useRef()

  //move OTP number forward
  const focusNextInputField = (index) => {
    setActiveOptIndex(index + 1)
  }

  //move OTP number backward
  const focusBackInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !==0 ? diff : 0;
    setActiveOptIndex(nextIndex)
  }

  const handleKeyDown = ({key}, index) => {
    currentOTPIndex = index;
    if (key === 'Backspace') {
      focusBackInputField(currentOTPIndex)
    }
    if (key === 13) {
      focusNextInputField(currentOTPIndex)
    }
  }

  //dynamically track OTP and limit OTP 1 number per field
  const handleOtpChange = ({target}) => {
    const { value } = target
    const newOtp = [...otp];
    newOtp[currentOTPIndex] = value.substring(value.length - 1, value.length);
    
    if(!value) focusBackInputField(currentOTPIndex);
    else focusNextInputField(currentOTPIndex);
    
    setOtp([...newOtp])
    console.log(value);
  }

  /*
   due to every input OTP number is empty before a user's keystroke, '?' marks access the object's(on the left)
   properity. It returns undefined when obj is empty and obj is false. \
   input focus dependent on the change of activeOptIndex 
  */
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOptIndex])


  return (
    <div className="fixed inset-0 bg-primary -z-10 flex justify-center items-center">
      <Container>
        <form className="bg-secondary rounded p-6 space-y-6">
          <div>
            <Title>Please Enter the OTP to verify your account</Title>
            <p className="text-center text-dark-subtle">
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
                  value = {otp[index] || ""}
                  onChange={handleOtpChange}
                  onKeyDown={(e)=> handleKeyDown(e,index)}
                  className="w-12 h-12 border-2 border-dark-subtle focus:border-white rounded 
                bg-transparent outline-none text-center text-white font-semibold text-xl"
                />
              );
            })}
          </div>

          <Submit value="Send Link"></Submit>
        </form>
      </Container>
    </div>
  );
}
