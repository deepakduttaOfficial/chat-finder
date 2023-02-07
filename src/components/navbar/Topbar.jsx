import React from "react";
import {
  Flex,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Utils
import { BRAND_NAME } from "../../utils/ConstName";

// icons
import { BiMenu, BiBell } from "react-icons/bi";
import Menubar from "./Menubar";
// Custom style
import { topbarBrandStyle, topbarContainer } from "./style";

const TopBar = ({ onOpen, ...rest }) => {
  const TopbarBgColor = useColorModeValue("gray.100", "gray.900");
  const borderColor = useColorModeValue("gray.300", "gray.800");
  return (
    <Flex
      bg={TopbarBgColor}
      borderBottomColor={borderColor}
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
      <Text {...topbarBrandStyle}>{BRAND_NAME}</Text>
      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<BiBell />}
        />
        <Flex alignItems={"center"}>
          <Menubar borderColor={borderColor} />
        </Flex>
      </HStack>
    </Flex>
  );
};

export default TopBar;
