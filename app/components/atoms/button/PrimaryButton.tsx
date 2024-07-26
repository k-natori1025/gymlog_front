'use client'

import { Button } from '@chakra-ui/react'
import React, { FC, ReactNode, memo } from 'react'

type Props = {
  children: ReactNode
  type?: "button" | "submit" | "reset"
  isLoading?: boolean
}

export const PrimaryButton: FC<Props> = memo((props) => {

  const { children, type, isLoading } = props

  return (
    <Button 
      variant="custom" 
      type={type}
      isLoading={isLoading}
    >
      {children}
    </Button>
  )
})
