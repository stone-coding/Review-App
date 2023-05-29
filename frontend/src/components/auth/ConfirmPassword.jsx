import React from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import FormContainer from "./FormContainer";
import { commonModalClasses } from "../../utils/theme";

export default function ConfirmPassword() {
  return (
    <FormContainer >
      <Container>
        <form className={commonModalClasses + " w-96"}>
          <Title>Enter New Password</Title>
          <FormInput
            label="New Password"
            placeholder="********"
            name="password"
            type="password"
          ></FormInput>
          <FormInput
            label="Confirm Password"
            placeholder="********"
            name="password"
            type="password"
          ></FormInput>
          <Submit value="Confirm Password"></Submit>
        </form>
      </Container>
    </FormContainer>
  );
}
