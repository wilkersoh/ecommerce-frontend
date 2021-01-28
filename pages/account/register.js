import React, { useRef, useEffect, useState } from "react";
import NextLink from "next/link";
import { useForm, ErrorMessage } from "react-hook-form";
import { API_URL } from "../../utils/urls";

import { Box, Button, Stack, Input, Text, Link } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";

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
        const msg = payload.message[0].messages[0].message;
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
    // console.log(payload); // {status: "", user: {carts: [], orders:[], username: "wilker002" }}
  };

  console.log(errors);

  return (
    <Box>
      <Text fontWeight={700} fontSize='1.8em'>
        自由文創
      </Text>
      <Text as='h1' fontWeight={700} fontSize='1.8em'>
        Create Acount
      </Text>
      <Box>
        <Text>{errors.first_name && <span>Hi firstName</span>}</Text>
        <Text>{errors.last_name && <span>Hi lastName</span>}</Text>
        <Text>{errors.email && <span>Hi email</span>}</Text>
        <Text>{errors.password && <span>Hi password</span>}</Text>
        <Text>{isError && isError}</Text>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Input
            type='text'
            name='first_name'
            size='lg'
            defaultValue='yee'
            placeholder='First Name'
            ref={(e) => {
              register(e, { required: true });
              firstNameRef.current = e;
            }}
          />
          <Input
            type='text'
            name='last_name'
            size='lg'
            defaultValue='dev'
            placeholder='Last Name'
            ref={register({ required: true })}
          />
          <Input
            type='email'
            name='email'
            size='lg'
            defaultValue='selfpaths@gmail.com'
            placeholder='Email'
            ref={register({ required: true })}
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
      <Box>
        <NextLink href='/'>
          <Link>Return to store</Link>
        </NextLink>
      </Box>
    </Box>
  );
}
