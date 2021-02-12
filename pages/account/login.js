import React, { useState, useRef, useEffect } from "react";
import NextLink from "next/link";
import App from "../../components/App";
import { useForm } from "react-hook-form";
import { API_URL } from "../../utils/urls";
import { useAuth } from "../../context/AuthContext";
import { ClientMessage, ServerMessage } from "../../components/Messages";
import ResetPassword from "../../components/ResetPassword";
import { Box, Text, Input, Stack, Button, Link } from "@chakra-ui/react";

export default function Login() {
  const { setLoginUser } = useAuth();
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const emailRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const onSubmit = async (data) => {
    const res = await fetch(`${API_URL}/auth/local`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const { user } = await res.json();
    setLoginUser(user);
  };

  const onForgotPassword = () => {
    //
  };

  const onToggleForgot = () => setShowForgot((prev) => !prev);

  if (showForgot)
    return (
      <App>
        <ResetPassword>
          <Text
            textAlign={{ sm: "center", md: "left" }}
            onClick={onToggleForgot}>
            Cancel
          </Text>
        </ResetPassword>
      </App>
    );

  return (
    <App>
      <Box w={{ md: "50%" }}>
        <Text mb={8} as='h1' fontWeight={700}>
          Login
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Input
              type='email'
              name='identifier'
              size='lg'
              bg={"blue.0"}
              placeholder='Email'
              ref={(e) => {
                register(e, { required: true });
                emailRef.current = e;
              }}
            />
            <Input
              type='password'
              name='password'
              size='lg'
              bg={"blue.0"}
              placeholder='Password'
              ref={register({ required: true })}
            />

            <Box textAlign={{ sm: "center", md: "left" }} mb={4}>
              <Button
                size='md'
                type='submit'
                w='100px'
                isLoading={isLoading}
                bgColor='green.1'
                color='white'
                _active={{ bgColor: "green.1" }}
                _hover={{ bgColor: "green.1" }}
                py={5}>
                Sign in
              </Button>
            </Box>
          </Stack>
        </form>
        <Box
          textAlign={{ sm: "center", md: "left" }}
          color='green.1'
          fontWeight='500'>
          <Box d='inline-block' mt={2} onClick={onToggleForgot}>
            <Text>Forgot your password?</Text>
          </Box>
          <Box mt={5} mb={3}>
            <NextLink href='/account/register'>
              <Link>Create ccount</Link>
            </NextLink>
          </Box>
          <NextLink href='/'>
            <Link>Return to store</Link>
          </NextLink>
        </Box>
      </Box>
    </App>
  );
}
