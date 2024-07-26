import { Flex, Text, useTheme } from '@chakra-ui/react'
import React, { FC, memo } from 'react'
import LogoutButton from '../../atoms/button/LogoutButton'
import { useAuthContext } from '@/app/functions/contexts/AuthContext'

export const FooterNav: FC = memo(() => {
  const { user } = useAuthContext()
  const theme = useTheme()

  return (
    <Flex
      width="100%"
      py="10px"
      direction="row"
      justify="space-around"
      align="center"
      bg={theme.colors.brand.gradient}
      position="fixed"
      bottom="0"
    >
      <Text color="white">{user?.email}</Text>
      <LogoutButton />
    </Flex>
  )
})
