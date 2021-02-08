import React, { useState, useRef } from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";

export default function ResetPassword({ children, ...rest }) {
  const [isLoading, setIsLoading] = useState(false);
  const refInput = useRef("");

  const handleSubmit = () => {
    const value = refInput.current.value;
    setIsLoading(true);
    // Handle Email service
    /**
      Flow:
      1. After submit
      2. 嚴重 是不是robot 哪個照片是 true
      3. 跳回去login show notification， we send an email for reset password.
     */
    try {
      //
    } catch (error) {
      //
    }

    setIsLoading(false);
  };

  return (
    <Box {...rest}>
      <Text mb={8} as='h1' fontWeight={700} fontSize='1.8em'>
        Reset your password
      </Text>
      <Text>We will send you an email to reset your password.</Text>
      <Input ref={refInput} my={4} type='email' placeholder='Email' />
      <Box textAlign='center' mb={5}>
        <Button
          onClick={handleSubmit}
          size='md'
          w='100px'
          bgColor='green.1'
          isLoading={isLoading}
          color='white'>
          Submit
        </Button>
      </Box>
      <Box textAlign='center' color='green.1' fontWeight='500'>
        {children}
      </Box>
    </Box>
  );
}
