import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/e/signup" element={<Signup />} />
        <Route path="/e/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
