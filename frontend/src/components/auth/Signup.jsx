import React from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "./FormContainer";

export default function Signup() {
  return (
    <FormContainer >
      <Container>
        <form className={commonModalClasses + " w-72"}>
          <Title>Sign up</Title>
          <FormInput label='Name' placeholder='name' name='name' ></FormInput>
          <FormInput label='Email' placeholder='name@email.com' name='email' ></FormInput>
          <FormInput label='Password' placeholder='********' name='password' ></FormInput>
          <Submit value='Sign up'></Submit>
          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
            <CustomLink to="/auth/signin">Sign in</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
