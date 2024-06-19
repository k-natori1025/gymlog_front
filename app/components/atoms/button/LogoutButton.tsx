import React, { FC, memo } from 'react'
import { Button, Text } from '@chakra-ui/react';
import { IoMdLogOut } from "react-icons/io";
import { auth } from '@/app/functions/libs/firebase';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { API } from '@/app/functions/constants/apis';


const LogoutButton:FC = memo(() => {

  const router = useRouter()
  const handleLogout = async() => {
    try {
      await auth.signOut();
      const url = API.logout
      await axios.post(url, {}, {
        withCredentials: true
      });
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  return (
    <Button colorScheme='white' variant='ghost' onClick={handleLogout}>
      <Text fontSize="sm">ログアウト</Text>
      <IoMdLogOut/>
    </Button>
  )
})

export default LogoutButton
