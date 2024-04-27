import Home from "../component/homecomponent/Home.tsx"; // Correct import path for Entete component

import Help from "./Help";
import AboutUs from "./AboutUs";
import Login from "./Login";
import Explication from "./Explication.tsx";
import ContactUs from "./contact.tsx";
import {
  BrowserRouter as Router, // Utilisation de BrowserRouter avec un alias Router
  Route,
  Routes, // Utilisation de Routes au lieu de createRoutesFromElements
} from "react-router-dom";
import { getAccessToken} from "../apiClient/index.ts";
import { useState, useEffect } from "react";

const Homepage = () => {
  const [loggedIn, setLoggedIn] = useState<bool>(true);
  useEffect(() => {
    if (getAccessToken() == null) {
      setLoggedIn(false)
    }
  }, [])
  return (
    <Router>
      <Routes>
        <Route path="" element={ loggedIn ? "hi, I'am logged in" : <Home /> } />{" "}
        <Route path="help" element={<Help />} />{" "}
        <Route path="about" element={<AboutUs />} />{" "}
        { loggedIn ? null : <Route path="login" element={<Login />} /> }
        <Route path="Explication" element={<Explication />} />{" "}
        <Route path="ContactUs" element={<ContactUs />} />{" "}
      </Routes>
    </Router>
  );
};

export default Homepage;
