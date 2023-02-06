import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.AUTH);
  return currentUser ? children : <Navigate to={"/e/signup"} />;
};

export default PrivateRoute;
