"use client"

import React, { FC, memo, useState } from 'react'
import { PrimaryButton } from '@/app/components/atoms/button/PrimaryButton'
import { Box, Button, Divider, FormControl, FormHelperText, Heading, Input, InputGroup, InputRightElement, Link, Stack, Text } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/app/functions/libs/firebase'
import { useRouter } from 'next/navigation'
import { API } from '@/app/functions/constants/apis'
import axios from 'axios'

type Inputs = {
  userName: string
  email: string
  password: string
}

export const LoginForm: FC = memo(() => {
  
  const [show, setShow] = useState(false)

  const router = useRouter()
  
  const handleClick = () => {
    setShow(!show)
  }

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
      const token = await userCredential.user.getIdToken();
      const url = API.userLogin
      await axios.post(url, {}, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      })
      router.push('/')
    } catch(error: any) {
      if(error.code === "auth/invalid-credential") {
        alert("メールアドレスもしくはパスワードが間違っています。")
      } else {
        alert(error.message)
        console.log("Logged in Error", error)
      }
    }
  }

  return (
    <Box bg="white" w="md" p={6} borderRadius="lg" shadow="xl">
        <Heading as="h2" size="lg" textAlign="center">ログイン</Heading>
        <Divider my={4} />
        <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={6} py={4} px={6}>
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
            <PrimaryButton type="submit">ユーザー登録</PrimaryButton>
          </Stack>
        </FormControl>
        <Box textAlign="center">
          <Text>まだユーザー登録をしていませんか？</Text>
          <Link href="/auth/register" color="blue.300">新規登録ページへ</Link>
        </Box>
      </Box>
  )
})

