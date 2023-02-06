import React, { useEffect, useState } from "react";
import {
  Button,
  chakra,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

// React-readux
import { useDispatch, useSelector } from "react-redux";

// Import component style
import {
  containerStyle,
  dividerStyle,
  formContainerStyle,
  headingStyle,
  signupButtonStyle,
} from "./style";

//  icons
import { FcGoogle } from "react-icons/fc";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { signinWithEmail } from "../../redux/action/authAction";

const Signin = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [isPassword, setIsPassword] = useState(true);
  const { currentUser, loading, error } = useSelector((state) => state.AUTH);
  // Get value from input
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { email, password } = values;

  // Change the input value
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  // Hanlde sign in
  const handleSignin = (e) => {
    e.preventDefault();
    dispatch(signinWithEmail(email, password));
    setValues({ email: "", password: "" });
  };

  // handle Google sing in
  const googleSignin = () => {
    //
  };

  const validator =
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
    password.length < 6;

  if (currentUser) {
    return <Navigate to={"/chart"} />;
  }

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
  return (
    <Container {...containerStyle}>
      <Heading {...headingStyle}>Message app</Heading>
      <VStack {...formContainerStyle}>
        <chakra.form w="full" onSubmit={handleSignin}>
          <VStack spacing="3">
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
              <FormHelperText>Password must be 6 charecter long</FormHelperText>
            </FormControl>
          </VStack>
          {/* Sign up button */}
          <Button
            {...signupButtonStyle}
            type="submit"
            isLoading={loading}
            isDisabled={validator}
          >
            Signin
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
            onClick={googleSignin}
            isLoading={loading}
            loadingText={"Loding..."}
          >
            Sign in with Google
          </Button>
        </VStack>
      </VStack>
    </Container>
  );
};

export default Signin;
