import React from "react";
import {
  Box,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { BRAND_NAME } from "../../utils/ConstName";

// Nav item means Links style
import NavItem from "./NavItem";

// Custom style
import {
  sidebarBrandContainer,
  sidebarBrandStyle,
  sidebarContainerStyle,
} from "./style";

import { ShortUser } from "./NavItem";
import { useSearchParams } from "react-router-dom";

// All the links
const LinkItems = [
  { name: "Home", link: "/chart", userId: "764236h34nnlk43" },
  { name: "Trending", link: "/chart", userId: "ds64236h34nnlk43" },
  { name: "Explore", link: "/chart", userId: "fgf64236h34nnlk43" },
  { name: "Favourites", link: "/chart", userId: "fg64236h34nnlk43" },
];

const Sidebar = ({ onClose, ...rest }) => {
  const SidebarBgColor = useColorModeValue("gray.100", "gray.900");
  const borderColor = useColorModeValue("gray.300", "gray.800");
  const [val] = useSearchParams();
  const userId = val.get("userId");
  return (
    <Box
      bg={SidebarBgColor}
      borderRightColor={borderColor}
      {...sidebarContainerStyle}
      {...rest}
    >
      <Flex {...sidebarBrandContainer} borderBottomColor={borderColor}>
        <Text {...sidebarBrandStyle}>{BRAND_NAME}</Text>
        <Box
          ml="40"
          borderLeft={"1px"}
          borderLeftColor={borderColor}
          display={{ base: "none", md: "block" }}
        >
          {userId && <ShortUser>Deepak</ShortUser>}
        </Box>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Box overflow={"scroll"} h="full">
        {LinkItems.map((item, index) => (
          <NavItem
            key={index}
            index={index}
            link={item.link}
            userId={item.userId}
          >
            {item.name}
          </NavItem>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
