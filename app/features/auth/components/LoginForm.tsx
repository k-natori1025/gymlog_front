"use client"

import React, { FC, memo, useState } from 'react'
import { PrimaryButton } from '@/app/components/atoms/button/PrimaryButton'
import { AbsoluteCenter, Box, Button, Divider, FormControl, FormHelperText, Heading, Input, InputGroup, InputRightElement, Link, Stack, Text } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoadingSpinner } from '@/app/components/atoms/button/LoadingSpinner'
import { SocialLoginButton } from './SocialLoginButton'
import { useAuthContext } from '@/app/functions/contexts/AuthContext'

type Inputs = {
  userName: string
  email: string
  password: string
}

export const LoginForm: FC = memo(() => {
  
  const [show, setShow] = useState(false)
  const { login, loading } = useAuthContext()
  
  const handleClick = () => {
    setShow(!show)
  }

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    await login('email', { email: data.email, password: data.password });
  }
  const handleGoogleLogin = () => login('google');
  const handleTwitterLogin = () => login('twitter');

  return (
    <>
      <Box bg="white" w="md" p={6} borderRadius="lg" shadow="xl">
        <Heading as="h2" size="lg" textAlign="center">ログイン</Heading>
        <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={6}>
            <Box> 
              <Text fontSize="sm">メールアドレス</Text>
              <Input 
                {...register("email", {
                  required: "メールアドレスは必須です！",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "正しいメールアドレスを入力してください",
                  }
                })} 
                placeholder="メールアドレス" 
                type="email" 
              />
              {errors.email && (
                <Text color="red.500" fontSize="sm">
                  {errors.email.message}
                </Text>
              )}
            </Box>
            <Box>
              <Text fontSize="sm">パスワード</Text>
              <FormHelperText color="blue.300">半角英数字 6文字以上</FormHelperText>
              <InputGroup>
                <Input
                  {...register("password", {
                    required: "パスワードは必須です！",
                    pattern: {
                      value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
                      message: "パスワードは6文字以上の半角英数字の組み合わせで入力してください。",
                    }
                  })} 
                  placeholder="パスワード" 
                  type={show ? 'text' : 'password'}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && (
                <Text color="red.500" fontSize="sm">
                  {errors.password.message}
                </Text>
              )}     
            </Box>
            <PrimaryButton type="submit">ログイン</PrimaryButton>
          </Stack>
        </FormControl>
        <Box position='relative' py={6} >
          <Divider borderWidth={1} />
          <AbsoluteCenter bg='white' px='4'>
            または
          </AbsoluteCenter>
        </Box>
        <Stack spacing={4}>
          <SocialLoginButton
            provider="google"
            onClick={handleGoogleLogin}
          >
            Googleでログイン
          </SocialLoginButton>
          <SocialLoginButton
            provider="twitter"
            onClick={handleTwitterLogin}
          >
            Twitterでログイン
          </SocialLoginButton>
        </Stack>
        <Box textAlign="center">
          <Text>まだユーザー登録をしていませんか？</Text>
          <Link href="/auth/register" color="blue.300">新規登録ページへ</Link>
        </Box>
      </Box>
      {loading&& <LoadingSpinner />}
    </>
    
  )
})

