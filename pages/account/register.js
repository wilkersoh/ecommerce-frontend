import React, { useRef, useEffect, useState } from "react";
import NextLink from "next/link";
import { useForm, ErrorMessage } from "react-hook-form";
import { API_URL } from "../../utils/urls";
import App from "../../components/App";
import Messages from "../../components/Messages";
import { useAuth } from "../../context/AuthContext";
import { Box, Button, Stack, Input, Text, Link } from "@chakra-ui/react";

export default function register() {
  const { register, handleSubmit, errors } = useForm();
  const [isError, setError] = useState("");
  const firstNameRef = useRef();
  const { setLoginUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log("hit submit");
    try {
      console.log("hit 1");
      const res = await fetch(`${API_URL}/auth/local/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("hit 2");
      const payload = await res.json();

      console.log("hit 3");
      if (payload.statusCode === 400) {
        const msg = payload.message[0].messages[0].message;
        console.log(payload);
        setError(msg);
        setIsLoading(false);
        return;
      }

      // save in contextAuth
      setLoginUser(payload.user);
    } catch (error) {
      console.log("register error: ", error);
      // doing popup handle error
    }
    console.log(payload); // {status: "", user: {carts: [], orders:[], username: "wilker002" }}
  };

  console.log(isError);

  return (
    <App>
      <Box>
        <Text mb={8} as='h1' fontWeight={700}>
          Create Acount
        </Text>

        {errors.length && <Messages status={"errors"} messages={errors} />}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Input
              type='text'
              name='first_name'
              size='lg'
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
              placeholder='Email'
              ref={register({ required: true })}
            />
            <Input
              type='password'
              name='password'
              size='lg'
              placeholder='Password'
              ref={register({
                required: true,
                minLength: { value: 6, message: "Password is too short" },
              })}
            />
            <Box textAlign='center' mb={4}>
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
        <Box textAlign='center' color='green.1' fontWeight='500'>
          <NextLink href='/'>
            <Link>Return to store</Link>
          </NextLink>
        </Box>
      </Box>
    </App>
  );
}
