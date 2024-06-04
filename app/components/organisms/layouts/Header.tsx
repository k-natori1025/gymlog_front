'use client'

import React, { FC, memo } from 'react'
import { Box, Flex, Heading, Link, useDisclosure } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/react';
import MenuIconButton from '../../atoms/button/MenuIconButton';
import MenuDrawer from '../../molecules/MenuDrawer';

export const Header: FC = memo(() => {

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
          <Box pr={4}>
            <Link>記録する</Link>
          </Box>
          <Link>設定</Link>
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
