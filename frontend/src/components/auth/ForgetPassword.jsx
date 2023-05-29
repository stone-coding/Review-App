import React from 'react'
import Container from '../Container'
import Title from '../form/Title'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import CustomLink from '../CustomLink'
import FormContainer from './FormContainer'
import { commonModalClasses } from '../../utils/theme'

export default function ForgetPassword() {
  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses + "  w-96"}>
          <Title>Please Enter Your Email</Title>
          <FormInput label='Email' placeholder='name@email.com' name='email' ></FormInput>
          <Submit value='Send Link'></Submit>
          <div className="flex justify-between">
            <CustomLink to="/auth/signin">Sign in</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  )
}
