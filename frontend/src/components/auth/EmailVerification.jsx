import React, { useEffect, useRef, useState } from "react";
import Container from "../Container";
import Submit from "../form/Submit";
import Title from "../form/Title";

const OTP_LENGTH = 6;

export default function EmailVerification() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOptIndex, setActiveOptIndex] = useState(0);

  const inputRef = useRef()

  const handleOtpChange = ({target}, index) => {
    const {value} = target
    
    // when type input this makes input arrays to a single input(wired) issue.
    // one solution is providing a reference to next input as reference hook
    // setOtp([value])
    setActiveOptIndex(index + 1)
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOptIndex])
  console.log(inputRef);

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
                  onChange={(e)=> handleOtpChange(e,index)}
                  className="w-12 h-12 border-2 border-dark-subtle focus: border-white rounded 
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
