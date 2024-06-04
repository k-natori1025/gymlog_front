'use client'

import { Button } from '@chakra-ui/react'
import React, { FC, ReactNode, memo } from 'react'

type Props = {
  children: ReactNode
  type?: "button" | "submit" | "reset"
}

export const PrimaryButton: FC<Props> = memo((props) => {

  const { children, type } = props

  return (
    <Button variant="custom" type={type}>
      {children}
    </Button>
  )
})
