import React from "react";

// React router dom
import { useSearchParams } from "react-router-dom";
// Chakra
import {
  Box,
  Button,
  chakra,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom wrapper
import Wrapper from "../../components/navbar";

const DashBoard = () => {
  const [val, setVal] = useSearchParams();
  const userId = val.get("userId");
  console.log(val.get("userId"));
  return (
    <Wrapper>
      <Box>
        {userId &&
          Array(60)
            .fill(" ")
            .map((_, index) => {
              return (
                <Box key={index}>
                  <chakra.a href={`#${index}`}>{userId}</chakra.a> <br />
                </Box>
              );
            })}
      </Box>
    </Wrapper>
  );
};

export default DashBoard;
