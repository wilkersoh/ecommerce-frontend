import React, { useState, useRef, useEffect } from "react";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { Box, Text, Input, Stack, Button, Link } from "@chakra-ui/react";
import { API_URL } from "../../utils/urls";
import { useAuth } from "../../context/AuthContext";

export default function App() {
  const { setLoginUser } = useAuth();
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <Box>
      <Text fontWeight={700} fontSize='1.8em'>
        自由文創
      </Text>
      <Text as='h1' fontWeight={700} fontSize='1.8em'>
        Login
      </Text>
      <Box>
        <Text>{errors.email && <span>Hi email</span>}</Text>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Input
            type='email'
            name='identifier'
            size='lg'
            defaultValue='selfpaths@gmail.com'
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
            defaultValue='password'
            placeholder='Password'
            ref={register({ required: true })}
          />

          <Button type='submit' isLoading={isLoading} colorScheme='teal' py={4}>
            Create
          </Button>
        </Stack>
      </form>
      <Box>Forgot your password?</Box>
      <Box>
        <NextLink href='/'>
          <Link>Return to store</Link>
        </NextLink>
      </Box>
    </Box>
  );
}
