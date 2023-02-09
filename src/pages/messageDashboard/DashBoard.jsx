import React, { useEffect, useRef, useState } from "react";

// Chakra
import { Box, Flex, Progress, Text } from "@chakra-ui/react";
// Custom wrapper
import Wrapper from "../../components/navbar";
// Redux
import { useSelector } from "react-redux";
//  Firebase
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
// Custom style
import { containerStyle, textContainerStyle, timeStyle } from "./style";

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
  }, [currentGroup && currentGroup[0]]);

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
      <Box ref={messRef} px="3">
        {loadingData && <Progress size="xs" isIndeterminate />}
        {message?.map((mess) => {
          return (
            <Flex
              justifyContent={mess.senderId === currentUser.uid && "flex-end"}
              key={mess.id}
              {...containerStyle}
            >
              <Box
                bgColor={
                  mess.senderId === currentUser.uid ? "green.100" : "gray.300"
                }
                {...textContainerStyle}
              >
                <Text mr="12">{mess.message}</Text>
                <Text aria-level="time" {...timeStyle}>
                  2:21 am
                </Text>
              </Box>
            </Flex>
          );
        })}
      </Box>
    </Wrapper>
  );
};

export default DashBoard;
