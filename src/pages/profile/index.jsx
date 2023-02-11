import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  chakra,
  useToast,
} from "@chakra-ui/react";
// Custom image uploader component
import ImageUpload from "./ImageUpload";

// Custom style
import { containerStyle } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { updateField, uploadImage } from "../../redux/action/profileActon";
import SpinnerLoading from "../../components/animation/SpinnerLoading";
import { NavLink } from "react-router-dom";

const Profile = () => {
  const toast = useToast();
  // Current User
  const { currentUser } = useSelector((state) => state.AUTH);
  const { loading, error, success } = useSelector((state) => state.PROFILE);
  const dispatch = useDispatch();
  //
  const [name, setName] = useState(currentUser.displayName);

  // Update image
  const imageHandle = (e) => {
    dispatch(uploadImage(e.target.files[0], currentUser));
  };

  // Update field [name]
  const hadleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateField(name));
  };

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        position: "top-right",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    if (success) {
      toast({
        title: success,
        position: "top-right",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [error, success]);

  return (
    <Container>
      <SpinnerLoading loading={loading} />
      <chakra.form px="5" onSubmit={hadleUpdate}>
        <Stack bg={useColorModeValue("white", "gray.700")} {...containerStyle}>
          <FormControl id="userName" w="full">
            <Center>
              <Avatar size="xl" src={currentUser?.photoURL}>
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="green"
                  overflow={"hidden"}
                >
                  <ImageUpload onChange={imageHandle} />
                </AvatarBadge>
              </Avatar>
            </Center>
          </FormControl>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={name}
              focusBorderColor="green.200"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="email" isDisabled isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              defaultValue={currentUser.email}
            />
          </FormControl>

          <Stack spacing={6} direction={["column", "row"]}>
            <Button w="full" as={NavLink} to="/">
              Cancel
            </Button>
            <Button colorScheme={"green"} w="full" type="submit">
              Update
            </Button>
          </Stack>
        </Stack>
      </chakra.form>
    </Container>
  );
};

export default Profile;
