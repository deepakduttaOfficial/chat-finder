import React from "react";
import {
  Avatar,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  MenuDivider,
} from "@chakra-ui/react";

// Custom style
import { menuButtonStyle } from "./style";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

const Menubar = ({ borderColor }) => {
  // Current user
  const { currentUser } = useSelector((state) => state.AUTH);
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Log out");
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };
  return (
    <Menu>
      <MenuButton {...menuButtonStyle}>
        <HStack>
          <Avatar
            size={"sm"}
            src={
              currentUser?.photoURL ||
              "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
            }
          />
        </HStack>
      </MenuButton>
      <MenuList
        bg={useColorModeValue("white", "gray.900")}
        borderColor={borderColor}
      >
        <MenuItem>{currentUser?.email}</MenuItem>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Billing</MenuItem>
        <MenuDivider />
        <MenuItem onClick={handleLogOut}>Sign out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Menubar;
