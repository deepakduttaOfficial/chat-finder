import React, { useEffect, useState } from "react";
import {
  Button,
  chakra,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
// React-readux
import { useDispatch, useSelector } from "react-redux";

// React router dom
import { Navigate, NavLink } from "react-router-dom";

//  icons
import { FcGoogle } from "react-icons/fc";
import { BiShowAlt, BiHide } from "react-icons/bi";

// Import component style
import {
  containerStyle,
  dividerStyle,
  formContainerStyle,
  signupButtonStyle,
} from "./style";

// All action
import {
  registerUser,
  registerUserWithGoogle,
} from "../../redux/action/authAction";

// App logo
import app_logo from "../../assets/app_logo.png";
// Import Loading progress bar
import SpinnerLoading from "../../components/animation/SpinnerLoading";

const Signup = () => {
  // Toast to show the error or success
  const toast = useToast();

  // Local state
  const [isPassword, setIsPassword] = useState(true);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Extract the value
  const { name, email, password } = values;

  // React-readux
  const dispatch = useDispatch();
  const { error, loading, currentUser } = useSelector((state) => state.AUTH);

  // Change the input value
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  // Hanlde email and password athentication
  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
    setIsPassword({
      name: "",
      email: "",
      password: "",
    });
  };

  // Handle Signup using google
  const googleSignup = () => {
    dispatch(registerUserWithGoogle());
  };

  // handle The response to update the UI error/success
  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [error]);

  // Small validator
  const validator =
    name.length === 0 ||
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
    password.length < 6;

  if (currentUser) {
    return <Navigate to={"/"} />;
  }

  return (
    <Container
      {...containerStyle}
      borderColor={useColorModeValue("gray.300", "whiteAlpha.400")}
    >
      <SpinnerLoading loading={loading} />
      <VStack>
        <Image src={app_logo} w={{ base: "44", md: "52" }} />
      </VStack>
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
                focusBorderColor="green.200"
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
                focusBorderColor="green.200"
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
                  focusBorderColor="green.200"
                  value={password}
                  onChange={handleChange("password")}
                />
              </InputGroup>
              <FormHelperText>Password must be 6 charecter long</FormHelperText>
            </FormControl>
          </VStack>
          {/* Sign up button */}
          <Button {...signupButtonStyle} type="submit" isDisabled={validator}>
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
          <Button
            w={"full"}
            variant={"outline"}
            leftIcon={<FcGoogle />}
            onClick={googleSignup}
          >
            Sign up with Google
          </Button>
        </VStack>
      </VStack>
      <VStack>
        <Text align={"center"}>
          Already have an account?{" "}
          <Link
            as={NavLink}
            color={"blue.400"}
            textTransform="uppercase"
            to={"/e/signin"}
            fontSize="sm"
          >
            Sign In
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};

export default Signup;
