import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../providers/AuthProvider";

const LoginPage = () => {
  const toast = useToast();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const loginResponse = await fetch(
        `${process.env.REACT_APP_BASE_URL}/connect?type=3`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const response = await loginResponse.json();
      if (!loginResponse.ok) {
        throw new Error(response.error);
      } else {
        toast({
          title: "Connexion réussie",
          status: "success",
          isClosable: true,
          duration: 3000,
        });
        login(response.user);
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Heading fontSize="4xl">Connexion au services</Heading>
        <Box
          rounded="lg"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="lg"
          p={8}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="login" isInvalid={errors.login}>
                <FormLabel>Identifiant</FormLabel>
                <Input
                  type="text"
                  {...register("login", {
                    required: "Identifiant requis",
                    // pattern: {
                    //   value:
                    //     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    //   message: "Invalid email address",
                    // },
                  })}
                />
                <FormErrorMessage>
                  {errors.login && errors.login.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl id="password" isInvalid={errors.password}>
                <FormLabel>Mot de passe</FormLabel>
                <Input
                  type="password"
                  {...register("password", {
                    required: "Mot de passe requis",
                    // minLength: {
                    //   value: 6,
                    //   message: "Minimum length should be 6",
                    // },
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Stack direction="column">
                {errorMessage ? (
                  <Text fontSize={12} textColor="red">
                    {errorMessage}
                  </Text>
                ) : null}
                <Button
                  type="submit"
                  bg="cyan.400"
                  color="white"
                  _hover={{
                    bg: "cyan.500",
                  }}
                  isLoading={isSubmitting}
                >
                  Connexion
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
