import React from "react";
import {
  Box,
  CloseButton,
  Flex,
  Image,
  Progress,
  useColorModeValue,
} from "@chakra-ui/react";

// Custom style
import { sidebarBrandContainer, sidebarContainerStyle } from "./style";

import { useSelector } from "react-redux";

// Contact list container
import ContactList from "./ContactList";

// Not contact found Images
import not_found from "../../assets/not_found.svg";
import FindStranger from "./FindStranger";
// Logo
import app_logo from "../../assets/app_logo.png";

const Sidebar = ({ onClose, ...rest }) => {
  // Colors theme
  const SidebarBgColor = useColorModeValue("gray.100", "gray.900");
  const borderColor = useColorModeValue("gray.300", "gray.800");
  // Get all the state
  const { contactList, loading } = useSelector((state) => state.CONTACT_LIST);

  const isEmptyContactList =
    contactList && Object.keys(contactList)?.length === 0;

  return (
    <Box
      bg={SidebarBgColor}
      borderRightColor={borderColor}
      {...sidebarContainerStyle}
      {...rest}
    >
      <Flex {...sidebarBrandContainer} borderBottomColor={borderColor}>
        <Image src={app_logo} w="24" ml="10" />
        <CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={onClose}
          border="1px"
          borderColor={"gray.300"}
        />
      </Flex>
      <Box overflow={"scroll"} h="full">
        {loading && <Progress size="xs" isIndeterminate />}
        {isEmptyContactList && <Image src={not_found} mt="5" p="5" />}
        <Box p="2">
          <FindStranger />
        </Box>
        {contactList &&
          Object.entries(contactList)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((contact) => (
              <ContactList
                contactList={contact}
                key={contact[0]}
                onClose={onClose}
              />
            ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
