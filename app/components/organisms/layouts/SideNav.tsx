import { Box, Flex, Image, Stack, Text, useTheme } from '@chakra-ui/react'
import React, { FC, memo } from 'react'
import LogoutButton from '../../atoms/button/LogoutButton'
import NavigationButton from '../../atoms/button/NavigationButton'
import { MdHome } from 'react-icons/md'
import { IoIosAddCircle } from 'react-icons/io'
import { BsGraphUpArrow } from 'react-icons/bs'
import { FaBrain } from "react-icons/fa";
import { useAuthContext } from '@/app/functions/contexts/AuthContext'

export const SideNav:FC = memo(() => {
  const { user } = useAuthContext()
  const theme = useTheme()
  console.log("ユーザ情報:", user)

  return (
    <Box
      width="100%"
      height="100vh"
      bg={theme.colors.brand.gradient}
    >
      <Flex 
        direction="column" 
        align="center" 
        height="100vh" 
        justify="space-between"
        display={{ base: "none", md: "flex" }} //spの時は表示しない
      >
        <Flex direction="column" my="20px" as="a" _hover={{ cursor: "pointer" }}>
          <Image src="/gymlog_logo3.png" alt="TrainingLog Logo" boxSize="90px" />
          {/* <Heading as="h2" fontSize={{base: "md", md: "lg" }} color="white">
            GymLog
          </Heading> */}
        </Flex>
        <Flex flexGrow={1}>
          <Stack direction="column" align="center" spacing={4} mt={4}>
            <NavigationButton label="ホーム" path="/" icon={MdHome} iconSize="24px" />
            <NavigationButton label="記録する" path="/record" icon={IoIosAddCircle} iconSize="24px" />
            <NavigationButton label="レポート" path="/log" icon={BsGraphUpArrow} iconSize="24px" />
            <NavigationButton label="AIコーチ" path="/ai_coach" icon={FaBrain} iconSize="24px" />
          </Stack>
        </Flex>
        <Flex direction="column" align="center" justify="center">
          <Text color="white">{user?.displayName}</Text>
          <LogoutButton />
        </Flex>
      </Flex>
    </Box>
  )
})
