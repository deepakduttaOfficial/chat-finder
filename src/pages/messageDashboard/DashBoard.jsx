import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { Heading, Image } from "@chakra-ui/react";

const DashBoard = () => {
  const auth = getAuth();
  const signout = () => {
    signOut(auth).then(() => {
      console.log("Log out");
    });
  };
  const { currentUser } = useSelector((state) => state.AUTH);

  return (
    <div>
      <button onClick={signout}>Sign out</button>

      <Image src={currentUser.photoURL} />

      <Heading>{currentUser.displayName}</Heading>
    </div>
  );
};

export default DashBoard;
