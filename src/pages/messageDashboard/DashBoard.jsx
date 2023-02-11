import React, { useEffect, useRef, useState } from "react";

// Chakra
import {
  Box,
  Image,
  Link,
  Progress,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
// Custom wrapper
import Wrapper from "../../components/navbar";
// Redux
import { useSelector } from "react-redux";
//  Firebase
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
// Custom style
import MessageCard from "./MessageCard";

// Import logo
import app_logo from "../../assets/app_logo.png";
import FindStranger from "../../components/navbar/FindStranger";

const DashBoard = () => {
  const messRef = useRef();
  // Get message and auth state
  const { currentGroup, loading, success } = useSelector(
    (state) => state.MESSAGE
  );
  const { currentUser } = useSelector((state) => state.AUTH);

  const [message, setMessage] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  // Fetching all group message
  useEffect(() => {
    !currentGroup && setMessage([]);
    const unsub = () => {
      setLoadingData(true);
      onSnapshot(doc(db, "chats", currentGroup?.[0]), (doc) => {
        setMessage(doc.data().message);
        setLoadingData(false);
      });
      return () => {
        unsub();
      };
    };
    currentGroup && unsub();
  }, [currentGroup]);

  // Scroll bottom
  useEffect(() => {
    const bottomScroll =
      messRef.current && window.scrollTo(0, messRef.current.offsetHeight);
    return () => {
      bottomScroll;
    };
  }, [loadingData, loading, success]);

  return (
    <Wrapper>
      <Box ref={messRef} px="5" pb="32">
        {loadingData && <Progress size="xs" isIndeterminate />}
        {message.length === 0 && !currentGroup && (
          <VStack px="5" maxW="450px" mx="auto" mt={10}>
            <Image src={app_logo} />
            <FindStranger />

            <Text
              color={useColorModeValue("blackAlpha.500", "whiteAlpha.500")}
              textAlign="center"
            >
              © Deepak Dutta . All rights reserved
            </Text>
            <Link
              color={"blue.400"}
              textTransform="uppercase"
              to={"/e/signin"}
              fontSize="sm"
              href="https://deepakdutta.netlify.app/"
              target="_blank"
            >
              Developer Info
            </Link>
          </VStack>
        )}
        {message?.map((mess) => (
          <MessageCard mess={mess} key={mess.id} currentUser={currentUser} />
        ))}
      </Box>
    </Wrapper>
  );
};

export default DashBoard;
