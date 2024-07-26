"use client"

import React, { FC } from 'react';
import { Spinner, Flex, Text, SpinnerProps, Box } from '@chakra-ui/react';

interface LoadingSpinnerProps {
  spinnerProps?: SpinnerProps;
  text?: string;
}

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({
  text,
}) => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      backgroundColor="rgba(0, 0, 0, 0.2)"
      zIndex={9999}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Flex direction="column" align="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
        {text && (
          <Text mt={4} color="white" fontSize="lg">
            {text}
          </Text>
        )}
      </Flex>
    </Box>
  );
};
