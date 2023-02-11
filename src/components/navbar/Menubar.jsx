import React from "react";
import {
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  MenuDivider,
  useColorMode,
  Text,
  Image,
  Avatar,
} from "@chakra-ui/react";

// Custom style
import { menuButtonStyle } from "./style";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";

// Icons
import { FiSun, FiMoon } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

// if user image not then this image
import current_user from "../../assets/current_user.png";
import { NavLink } from "react-router-dom";

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
  // Change theme/mode
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Menu>
      <MenuButton {...menuButtonStyle}>
        <HStack>
          <Avatar
            size="md"
            name={currentUser?.name}
            src={currentUser?.photoURL || current_user}
          />
        </HStack>
      </MenuButton>
      <MenuList
        bg={useColorModeValue("white", "gray.700")}
        borderColor={borderColor}
      >
        <MenuItem as={NavLink} to={"/account/profile"}>
          <HStack>
            <CgProfile />
            <Text>Profile</Text>
          </HStack>
        </MenuItem>
        <MenuItem onClick={toggleColorMode}>
          {colorMode === "light" ? (
            <HStack>
              <FiMoon />
              <Text>Dark</Text>
            </HStack>
          ) : (
            <HStack>
              <FiSun />
              <Text>Light</Text>
            </HStack>
          )}
        </MenuItem>

        <MenuDivider />
        <MenuItem onClick={handleLogOut}>Sign out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Menubar;
