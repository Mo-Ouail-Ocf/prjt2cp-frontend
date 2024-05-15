/* eslint-disable @typescript-eslint/no-unused-vars */
import Homepage from "./pages/Homepage";
import { getAccessToken } from "./apiClient/index.ts";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster"; // Adjust the import path as needed
import { SideBarData } from "./components/SideBarData";
import ProjectDetails from "./pages/ProjectDetails";
import Help from "./pages/Help";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Explication from "./pages/Explication.tsx";
import ContactUs from "./pages/contact.tsx";
import ProjectVisualize from "./pages/ProjectVisualize.tsx";
import {
  BrowserRouter,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Session from "./pages/Session.tsx";
import HeaderBarLayout from "./components/HeaderBar.tsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const login = async () => {
      try {
        const _ = await getAccessToken();
        setLoggedIn(true);
      } catch {
        console.log("Not authenticated");
      }
    };
    login();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    setLoggedIn(false);
  };

  return (
    <>
      <Router>
        <Routes>
          {loggedIn ? (
            <>
              <Route
                path="/"
                element={<HeaderBarLayout onSignOut={handleSignOut} />}
              >
                <Route>
                  {SideBarData.map((item, index) => {
                    return (
                      <Route
                        path={item.path}
                        element={item.element}
                        key={index}
                      />
                    );
                  })}
                  <Route
                    path="/project/:projectId"
                    element={<ProjectDetails />}
                  />
                  <Route
                    path="/visualize/:projectId"
                    element={<ProjectVisualize />}
                  />
                </Route>
              </Route>
              <Route path="/session/:session_id" element={<Session />}></Route>
            </>
          ) : (
            <>
              <Route path="/" element={<Homepage />}></Route>
              <Route path="/help" element={<Help />} />{" "}
              <Route path="/about" element={<AboutUs />} />{" "}
              <Route path="/login" element={<Login />} />{" "}
              <Route path="/Explication" element={<Explication />} />{" "}
              <Route path="/ContactUs" element={<ContactUs />} />{" "}
            </>
          )}
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
