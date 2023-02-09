import React, { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/messageDashboard/DashBoard";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
// Firebase stuff
import { setUser } from "./redux/action/authAction";
import { auth } from "./config/firebase";
import PrivateRoute from "./helpers/PrivateRoute";

const Routers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          }
        />
        <Route path="/e/signup" element={<Signup />} />
        <Route path="/e/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
