import React, { useState } from "react";
import {
  Button,
  chakra,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";

// Google icon
import { FcGoogle } from "react-icons/fc";
import { BiShowAlt, BiHide } from "react-icons/bi";

// Import component style
import {
  containerStyle,
  dividerStyle,
  formContainerStyle,
  headingStyle,
  signupButtonStyle,
} from "./style";

const Signup = () => {
  const [isPassword, setIsPassword] = useState(true);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  // Extract the value
  const { name, email, password } = values;

  // Change the input value
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  // Hanlde email and password athentication
  const handleSignup = (e) => {
    e.preventDefault();
  };

  // Handle google authentication

  return (
    <Container {...containerStyle}>
      <Heading {...headingStyle}>Message app</Heading>
      <VStack {...formContainerStyle}>
        <chakra.form w="full" onSubmit={handleSignup}>
          <VStack spacing="3">
            {/* Name */}
            <FormControl>
              <FormLabel>Your Name</FormLabel>
              <Input
                borderRadius="sm"
                placeholder="Name"
                type="text"
                value={name}
                onChange={handleChange("name")}
              />
            </FormControl>
            {/* Email */}
            <FormControl>
              <FormLabel>Your email</FormLabel>
              <Input
                borderRadius="sm"
                placeholder="Email"
                type="email"
                value={email}
                onChange={handleChange("email")}
              />
            </FormControl>
            {/* Password */}
            <FormControl>
              <FormLabel>Enter a pssword</FormLabel>
              <InputGroup>
                <InputRightElement>
                  <IconButton
                    variant={"ghost"}
                    onClick={() => setIsPassword((preV) => !preV)}
                  >
                    {isPassword ? <BiHide /> : <BiShowAlt />}
                  </IconButton>
                </InputRightElement>

                <Input
                  borderRadius="sm"
                  placeholder="Password"
                  type={isPassword ? "password" : "text"}
                  value={password}
                  onChange={handleChange("password")}
                />
              </InputGroup>
            </FormControl>
          </VStack>
          {/* Sign up button */}
          <Button {...signupButtonStyle} type="submit">
            Signup
          </Button>
        </chakra.form>
      </VStack>
      <VStack {...formContainerStyle}>
        <HStack justifyContent="start">
          <Divider {...dividerStyle} />
          <Text>Or</Text>
          <Divider {...dividerStyle} />
        </HStack>
        <VStack w="full">
          {/* Google */}
          <Button w={"full"} variant={"outline"} leftIcon={<FcGoogle />}>
            Sign up with Google
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Signup;
