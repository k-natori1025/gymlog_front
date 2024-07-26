"use client"

import React from 'react'
import SideNavLayout from '@/app/components/templates/SideNavLayout'
import { Box, Flex, VStack } from '@chakra-ui/react'
import { AiCoachForm } from '@/app/features/ai_coach/AiCoachForm'

const AiCoach = () => {

  return (
    <div>
        <SideNavLayout>
          <Box mt={10} minHeight="100vh">
            <VStack>
              <AiCoachForm />
            </VStack>
          </Box>
        </SideNavLayout>
      </div>
  )
}

export default AiCoach
