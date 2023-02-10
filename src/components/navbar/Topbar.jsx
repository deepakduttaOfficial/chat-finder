import React from "react";
import { Flex, HStack, IconButton, useColorModeValue } from "@chakra-ui/react";

// icons
import { BiMenu } from "react-icons/bi";
import Menubar from "./Menubar";
// Custom style
import { topbarContainer } from "./style";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

const TopBar = ({ onOpen, ...rest }) => {
  const { currentGroup } = useSelector((state) => state.MESSAGE);
  const TopbarBgColor = useColorModeValue("gray.100", "gray.900");
  const borderColor = useColorModeValue("gray.300", "gray.800");
  return (
    <Flex
      bg={TopbarBgColor}
      borderBottomColor={borderColor}
      justifyContent={{
        base: "space-between",
        md: currentGroup ? "space-between" : "flex-end",
      }}
      {...topbarContainer}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<BiMenu />}
      />

      {currentGroup && (
        <UserCard
          name={currentGroup[1]?.receiverInfo?.displayName}
          email={currentGroup[1]?.receiverInfo?.email}
          photoURL={currentGroup[1]?.receiverInfo?.photoURL}
          ml="5"
        />
      )}

      <HStack spacing={{ base: "0", md: "1" }}>
        <Flex alignItems={"center"}>
          <Menubar borderColor={borderColor} />
        </Flex>
      </HStack>
    </Flex>
  );
};

export default TopBar;
