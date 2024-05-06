import Home from "../components/homecomponent/Home.tsx"; // Correct import path for Entete component

import Help from "./Help";
import AboutUs from "./AboutUs";
import Login from "./Login";
import Explication from "./Explication.tsx";
import ContactUs from "./contact.tsx";
import {
  Route,
  Routes, // Utilisation de Routes au lieu de createRoutesFromElements
} from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<Home />} />{" "}
        <Route path="help" element={<Help />} />{" "}
        <Route path="about" element={<AboutUs />} />{" "}
        <Route path="login" element={<Login />} />{" "}
        <Route path="Explication" element={<Explication />} />{" "}
        <Route path="ContactUs" element={<ContactUs />} />{" "}
      </Routes>
    </>
  );
};

export default Homepage;
