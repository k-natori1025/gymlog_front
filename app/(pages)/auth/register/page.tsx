import React from 'react'
import { Flex } from '@chakra-ui/react'
import { RegisterForm } from '@/app/features/auth/components/RegisterForm'

const Register = () => {

  return (
    <Flex align="center" justify="center" height="100vh">
      <RegisterForm />
    </Flex>
  )
}

export default Register
