import React, { useEffect, useState } from "react";
import {
  Button,
  chakra,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
// React-readux
import { useDispatch, useSelector } from "react-redux";

// React router dom
import { Navigate } from "react-router-dom";

//  icons
import { BiShowAlt, BiHide } from "react-icons/bi";

// Import component style
import {
  containerStyle,
  formContainerStyle,
  headingStyle,
  signupButtonStyle,
} from "./style";

// All action
import { registerUser } from "../../redux/action/authAction";

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
            Signup
          </Button>
        </chakra.form>
      </VStack>
    </Container>
  );
};

export default Signup;
