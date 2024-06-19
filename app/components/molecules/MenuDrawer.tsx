import { Button, Drawer, DrawerBody, DrawerContent, DrawerOverlay } from '@chakra-ui/react'
import React, { FC, memo } from 'react'
import LogoutButton from '../atoms/button/LogoutButton';

type Props = {
  onClose: () => void;
  isOpen: boolean;
}

const MenuDrawer: FC<Props> = memo((props) => {
  const { onClose, isOpen } = props
  
  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerBody p={0} bg="gray.100">
              <Button w="100%">
                TOP
              </Button>
              <Button w="100%">
                記録する
              </Button>
              <Button w="100%">
                設定
              </Button>
              <LogoutButton />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
  )
})

export default MenuDrawer
