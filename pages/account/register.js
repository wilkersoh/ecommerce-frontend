import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { API_URL } from "../../utils/urls";

import { Box, Button, Stack, Input, Text, Link } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";

export default function register() {
  const { register, handleSubmit, watch, errors } = useForm();
  const router = useRouter();
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
        // credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("after await res return");
      const { user } = await res.json();
      console.log("user:::", user);
      // save in contextAuth
      setLoginUser(user);
    } catch (error) {
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
        <Text>{errors.firstname && <span>Hi firstName</span>}</Text>
        <Text>{errors.lastname && <span>Hi lastName</span>}</Text>
        <Text>{errors.email && <span>Hi email</span>}</Text>
        <Text>{errors.password && <span>Hi password</span>}</Text>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Input
            type='text'
            name='username'
            size='lg'
            defaultValue='wilker001'
            placeholder='User Name'
            ref={(e) => {
              register(e, { required: true });
              firstNameRef.current = e;
            }}
          />
          {/* <Input
            type='text'
            name='firstname'
            size='lg'
            defaultValue='wilker001'
            placeholder='First Name'
            ref={(e) => {
              register(e, { required: true });
              firstNameRef.current = e;
            }}
          />
          <Input
            type='text'
            name='lastname'
            size='lg'
            defaultValue='dev001'
            placeholder='Last Name'
            ref={register({ required: true })}
          /> */}
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
