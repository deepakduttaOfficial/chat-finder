import React, { useEffect, useRef, useState } from "react";

// Chakra
import { Box, Flex, Progress, Text, useColorModeValue } from "@chakra-ui/react";
// Custom wrapper
import Wrapper from "../../components/navbar";
// Redux
import { useSelector } from "react-redux";
//  Firebase
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
// Custom style
import { containerStyle, textContainerStyle, timeStyle } from "./style";
import MessageCard from "./MessageCard";

const DashBoard = () => {
  const messRef = useRef();
  // Get message and auth state
  const { currentGroup, loading } = useSelector((state) => state.MESSAGE);
  const { currentUser } = useSelector((state) => state.AUTH);

  const [message, setMessage] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  // Fetching all group message
  useEffect(() => {
    const unsub = () => {
      setLoadingData(true);
      onSnapshot(doc(db, "chats", currentGroup[0]), (doc) => {
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
  }, [loadingData, loading]);

  return (
    <Wrapper>
      <Box ref={messRef} px="5" pb="32">
        {loadingData && <Progress size="xs" isIndeterminate />}
        {message?.map((mess) => (
          <MessageCard mess={mess} key={mess.id} currentUser={currentUser} />
        ))}
      </Box>
    </Wrapper>
  );
};

export default DashBoard;
