/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAccessToken } from "./apiClient/index.ts";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster"; // Adjust the import path as needed
import { SideBarData } from "./components/SideBarData";
import ProjectDetails from "./pages/ProjectDetails";
import Login from "./pages/Login";
import ProjectVisualize from "./pages/ProjectVisualize.tsx";
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import Session from "./pages/Session.tsx";
import HeaderBarLayout from "./components/HeaderBar.tsx";
import Inbox from "./pages/Inbox.tsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const login = async () => {
      try {
        await getAccessToken();
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
      <div className="main">
        <div className="gradient"></div>
      </div>
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
                    path="/"
                    element={<Inbox />}
                  />
                  <Route
                    path="/project/:projectId"
                    element={<ProjectDetails />}
                  />
                </Route>
              </Route>
              <Route path="/session/:session_id" element={<Session />}/>
              <Route
                path="/visualize/:projectId"
                element={<ProjectVisualize />}
              />
            </>
          ) : (
            <>
              <Route path="/" element={<Login />} />{" "}
            </>
          )}
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
