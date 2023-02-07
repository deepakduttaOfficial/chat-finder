import React from "react";
import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import MessageSender from "../messageSender";

const Wrapper = ({ children, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bgColor={useColorModeValue("white", "black")}>
      <Sidebar
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* Top bar */}
      <TopBar onOpen={onOpen} pos="sticky" top="0" />
      {/* All message goes here */}
      <Box ml={{ base: 0, md: "72" }} {...rest} mb="32">
        {children}
      </Box>
      {/* Message sender input */}
      <MessageSender />
    </Box>
  );
};

export default Wrapper;
