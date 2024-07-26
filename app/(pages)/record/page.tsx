"use client"

import SideNavLayout from '@/app/components/templates/SideNavLayout'
import { WorkoutForm } from '@/app/features/workout/WorkoutForm'
import { Box, VStack } from '@chakra-ui/react'
import React from 'react'

const Record = () => {
  return (
      <div>
        <SideNavLayout>
          <Box mt={10} minHeight="100vh">
            <VStack>
              <WorkoutForm />
            </VStack>
          </Box>
        </SideNavLayout>
      </div>
  )
}

export default Record
