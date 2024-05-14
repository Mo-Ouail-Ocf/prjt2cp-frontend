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
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import HeaderBarLayout from "./components/HeaderBar.tsx";
import Session from "./pages/Session.tsx";

function App() {
  
  const user1 = {
    email: "user1_name@esi.dz",
    id: 1,
    name: "name1",
    pfp: "https://www.esi.dz/wp-content/uploads/2019/11/esi_white.png",
  };
  const user2 = {
    email: "user2_name@esi.dz",
    id: 2,
    name: "name2",
    pfp: "https://www.esi.dz/wp-content/uploads/2019/11/esi_white.png",
  };
  const user3 = {
    email: "user3_name@esi.dz",
    id: 3,
    name: "name3",
    pfp: "https://www.esi.dz/wp-content/uploads/2019/11/esi_white.png",
  };
  const users = new Map();
  users.set(1, user1);
  users.set(2, user2);
  users.set(3, user3);
  users.set(4, user3);
  users.set(5, user3);
  users.set(6, user3);

  // ideas.set(3, idea3);
  const colors = new Map();
  colors.set(1, "red");
  colors.set(2, "green");
  colors.set(3, "blue");
 
  const [loggedIn, setLoggedIn] = useState(true);
  useEffect(() => {
    if (getAccessToken() != null) {
      setLoggedIn(true);
    }
    setTimeout(() => {
      users.delete(1);
      console.log(users);
    }, 5000);
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
                element={<HeaderBarLayout  onSignOut={handleSignOut}/>}
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
