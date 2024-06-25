'use client'

import React, { FC, memo } from 'react'
import { Flex, Heading, Text, useDisclosure } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/react';
import MenuIconButton from '../../atoms/button/MenuIconButton';
import MenuDrawer from '../../molecules/MenuDrawer';
import LogoutButton from '../../atoms/button/LogoutButton';
import { useUserContext } from '@/app/functions/contexts/UserContext';

export const Header: FC = memo(() => {

  const { user } = useUserContext()
  const theme = useTheme()
  
  const { isOpen, onOpen, onClose } = useDisclosure()

  return(
    <>
      <Flex 
        as="nav" 
        bg={theme.colors.brand.gradient}
        color="gray.50" 
        align="center" 
        justify="space-between"
        padding={{ base: 3, md: 5}}
      >
        <Flex display={{ base: "none", md: "flex" }}>
          <LogoutButton />
          <Flex align="center" justify="center">
            <Text>{user?.email}</Text>
          </Flex>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
        <Flex as="a" _hover={{ cursor: "pointer" }}>
          <Heading as="h2" fontSize={{base: "md", md: "lg" }}>
            ジムログ
          </Heading>
        </Flex>
      </Flex>
      <MenuDrawer onClose={onClose} isOpen={isOpen} />
    </>
  )
});

export default Header
