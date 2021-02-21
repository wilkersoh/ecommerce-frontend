import React, { useRef, useEffect, useState } from "react";
import NextLink from "next/link";
import { useForm, ErrorMessage } from "react-hook-form";
import { API_URL } from "../../utils/urls";
import App from "../../components/App";
import { ClientMessage, ServerMessage } from "../../components/Messages";
import { useAuth } from "../../context/AuthContext";
import { Box, Button, Stack, Input, Text, Link } from "@chakra-ui/react";

export default function register() {
  const { register, handleSubmit, errors } = useForm();
  const [hasErrors, setErrors] = useState({});
  const firstNameRef = useRef();
  const { setLoginUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/local/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const payload = await res.json();
      if (payload.statusCode === 400) {
        throw new Error(payload.message[0].messages[0].message);
      }

      // save in contextAuth
      setLoginUser(payload.user);
    } catch (error) {
      setIsLoading(false);
      // doing popup handle error
      setErrors({ email: { type: "duplicated", message: error } });
    }
    // console.log(payload); // {status: "", user: {carts: [], orders:[], username: "wilker002" }}
  };

  return (
    <App>
      <Box w={{ md: "50%" }}>
        <Text mb={8} as='h1' fontWeight={700}>
          Create Acount
        </Text>

        {Object.keys(errors).length ? (
          <ClientMessage status={"error"} messages={errors} />
        ) : null}
        {Object.keys(hasErrors).length ? (
          <ServerMessage messages={hasErrors} />
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Input
              type='text'
              name='first_name'
              size='lg'
              isInvalid={errors?.first_name && true}
              errorBorderColor='red.300'
              placeholder='First Name'
              ref={(e) => {
                register(e, {
                  required: true,
                  maxLength: { value: 16, message: "First name is too long." },
                });
                firstNameRef.current = e;
              }}
            />

            <Input
              type='text'
              name='last_name'
              size='lg'
              isInvalid={errors?.last_name && true}
              errorBorderColor='red.300'
              placeholder='Last Name'
              ref={register({
                required: true,
                maxLength: { value: 16, message: "Last name is too long." }, // space also counted as length
              })}
            />
            <Input
              type='email'
              name='email'
              size='lg'
              isInvalid={hasErrors?.email && true}
              errorBorderColor='red.300'
              placeholder='Email'
              ref={register({ required: true })}
            />
            <Input
              type='password'
              name='password'
              size='lg'
              isInvalid={errors?.password && true}
              errorBorderColor='red.300'
              placeholder='Password'
              ref={register({
                required: true,
                minLength: { value: 6, message: "Password is too short" },
              })}
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
                Create
              </Button>
            </Box>
          </Stack>
        </form>
        <Box
          textAlign={{ sm: "center", md: "left" }}
          color='green.1'
          fontWeight='500'>
          <NextLink href='/'>
            <Link>Return to store</Link>
          </NextLink>
        </Box>
      </Box>
    </App>
  );
}
