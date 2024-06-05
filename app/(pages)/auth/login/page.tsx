import React from 'react'
import { Flex } from '@chakra-ui/react'
import { LoginForm } from '@/app/features/auth/components/LoginForm'

const Login = () => {

  return (
    <Flex align="center" justify="center" height="100vh">
      <LoginForm />
    </Flex>
  )
}

export default Login
