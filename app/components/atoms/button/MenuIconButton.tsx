import { HamburgerIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import React, { FC, memo } from 'react'

type Props = {
  onOpen: () => void;
}

const MenuIconButton:FC<Props> = memo((props) => {

  const { onOpen } = props
  return (
    <IconButton 
      aria-label="メニューボタン" 
      icon={<HamburgerIcon />}  
      size="md" 
      variant="unstyled" 
      display={{ base: "block", md: "none" }}
      onClick={onOpen}
    />
  )
})

export default MenuIconButton
