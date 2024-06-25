import React, { FC, ReactNode, memo } from 'react'
import { SideNav } from '../organisms/layouts/SideNav';
import { Grid, GridItem } from '@chakra-ui/react';
import { FooterNav } from '../organisms/layouts/FooterNav';

type Props = {
  children: ReactNode
}

const SideNavLayout: FC<Props> = memo((props) => {
  const { children } = props
  return(
    <Grid
      templateColumns={{ base: '1fr', md: '15% 1fr' }}
      templateRows={{ base: '1fr auto', md: '1fr' }}
      height="100vh"
    >
      <GridItem display={{ base: 'none', md: 'block' }}>
        <SideNav />
      </GridItem>
      <GridItem>
        {children}
      </GridItem>
        <GridItem display={{ base: 'block', md: 'none' }}>
          <FooterNav />
        </GridItem>
    </Grid>
  )
});

export default SideNavLayout
