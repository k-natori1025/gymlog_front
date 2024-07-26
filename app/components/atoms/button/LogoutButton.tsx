import React, { FC, memo } from 'react'
import { Button, Text } from '@chakra-ui/react';
import { IoMdLogOut } from "react-icons/io";
import { useAuthContext } from '@/app/functions/contexts/AuthContext';


const LogoutButton:FC = memo(() => {
  const { logout } = useAuthContext()
  const handleLogout = async() => {
    await logout()
  }
  return (
    <Button colorScheme='white' variant='ghost' onClick={handleLogout}>
      <Text fontSize="sm" color="white">ログアウト</Text>
      <IoMdLogOut color="white"/>
    </Button>
  )
})

export default LogoutButton
