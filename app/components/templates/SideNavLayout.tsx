import React, { FC, ReactNode, memo } from 'react'
import { SideNav } from '../organisms/layouts/SideNav';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { FooterNav } from '../organisms/layouts/FooterNav';

type Props = {
  children: ReactNode
}

const SideNavLayout: FC<Props> = memo((props) => {
  const { children } = props
  return(
    <Grid
      height="100vh"
    >
      <GridItem 
        display={{ base: 'none', md: 'block' }} //spの時にはサイドバー非表示
        position={{ base: 'static', md: 'fixed' }}
        top="0"
        left="0"
        height="100vh"
        width={{ base: '100%', md: '15%' }}
      >
        <SideNav />
      </GridItem>
      <GridItem
        marginLeft={{ base: '0', md: '15%' }}
        overflowY="auto"
        height="100vh"
      >
        <Box>
          {children}
        </Box>
      </GridItem>
        <GridItem 
          display={{ base: 'block', md: 'none' }} //spの時のみフッターを表示
          position="fixed"
          bottom="0"
          left="0"
          width="100%"
        >
          <FooterNav />
        </GridItem>
    </Grid>
  )
});

export default SideNavLayout
