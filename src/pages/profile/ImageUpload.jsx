import React from "react";
import { Box, Input } from "@chakra-ui/react";
// icons
import { FiEdit } from "react-icons/fi";

const ImageUpload = ({ onChange }) => {
  return (
    <Box pos="relative" w="15" rounded={"full"}>
      <Box pos="absolute" height="full" w="full" bottom="6px" right="7px">
        <FiEdit size={"15"} />
      </Box>

      <Input
        type="file"
        height="26px"
        width="8px"
        position="absolute"
        bottom="-13"
        left="-16px"
        rounded={"full"}
        opacity="0"
        accept="image/*"
        onChange={onChange}
      />
    </Box>
  );
};

export default ImageUpload;
