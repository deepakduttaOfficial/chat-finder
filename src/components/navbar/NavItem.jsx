import React from "react";
import {
  Divider,
  Flex,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { NavLink, useSearchParams } from "react-router-dom";

export const ShortUser = ({ children, userId, isHover, ...rest }) => {
  const hoverColorItem = useColorModeValue("whiteAlpha.500", "black");
  const [val] = useSearchParams();
  const urlId = val.get("userId");

  return (
    <VStack
      alignItems="start"
      align="center"
      p="4"
      bgColor={urlId === userId && hoverColorItem}
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: isHover && hoverColorItem,
      }}
      zIndex={"overlay"}
      spacing="0"
      {...rest}
    >
      <Text color={useColorModeValue("gray.500", "gray.600")}>{children}</Text>
      <Text>deepakdutta752@gmail.com</Text>
    </VStack>
  );
};

const NavItem = ({ index, link, userId, children, ...rest }) => {
  return (
    <NavLink to={`${link}?userId=${userId}`}>
      <ShortUser children={children} isHover={true} userId={userId} {...rest} />
      <Divider h="1px" bgColor={useColorModeValue("gray.300", "gray.200")} />
    </NavLink>
  );
};

export default NavItem;
