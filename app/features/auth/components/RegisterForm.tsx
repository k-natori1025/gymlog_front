"use client"

import React, { FC, memo, useState } from 'react'
import { PrimaryButton } from '@/app/components/atoms/button/PrimaryButton'
import { Box, Button, Divider, FormControl, FormHelperText, Heading, Input, InputGroup, InputRightElement, Link, Stack, Text } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/app/functions/libs/firebase'
import axios from 'axios'
import { API } from '@/app/functions/constants/apis'
import { useRouter } from 'next/navigation'

type Inputs = {
  userName: string
  email: string
  password: string
}

export const RegisterForm: FC = memo(() => {
  
  const [show, setShow] = useState(false)
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const handleClick = () => {
    setShow(!show)
  }

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const url = API.userRegister
      const response = await axios.post(url, {
        name: userName,
        email,
        password
      })
      console.log(response, "fastapiへのユーザー登録完了")
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password)
      const user = userCredential.user
      console.log("firebaseへのユーザー登録完了")
      router.push("/")
    } catch(error: any) {
        if(error.code === "auth/email-already-in-use") {
          alert("このメールアドレスはすでに使用されています。")
        } else {
          alert(error.message)
        }
    }
  }
  return (
    <Box bg="white" w="md" p={6} borderRadius="lg" shadow="xl">
        <Heading as="h2" size="lg" textAlign="center">新規登録</Heading>
        <Divider my={4} />
        <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={6} py={4} px={6}>
            <Box>
              <Text fontSize="sm">ユーザー名</Text>
              <Input
                {...register("userName", {
                  required: "ユーザー名は必須です！",
                })} 
                placeholder="ユーザー名" 
                type="text"
                onChange={(e) => {setUserName(e.target.value)}}
              />
              {errors.userName && (
                <Text color="red.500" fontSize="sm">
                  {errors.userName.message}
                </Text>
              )}
            </Box>
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
                onChange={(e) => {setEmail(e.target.value)}}
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
                  onChange={(e) => {setPassword(e.target.value)}}
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
          <Text>すでにアカウントをお持ちですか？</Text>
          <Link href="/auth/login" color="blue.300">ログインページへ</Link>
        </Box>
      </Box>
  )
})

