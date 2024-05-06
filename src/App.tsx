import Homepage from "./pages/Homepage";
import "./App.css";
import { getAccessToken } from "./apiClient/index.ts";
import { useState, useEffect } from "react";
import Worksapce from "./pages/Workspace.tsx";
import { Toaster } from "@/components/ui/toaster"; // Adjust the import path as needed
import QueuePage from "./pages/QueuePage.tsx";
import Essaibutton from "./ChatInSessions.tsx";
import { TabsDemo } from "./pages/Brainwriting.tsx";
import Chat from "./components/Chat.tsx";
function App() {
  const metadata = {
    title: "session title",
    ideation_technique: "brain_storming",
    round_time: 5,
    session_id: 1,
    session_status: "started",
    start_time: "",
    project_id: 1,
  };
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
  const props = {
    isMod: true,
    metadata: metadata,
    users: users,
    colors: colors,
    handleStart: () => {},
  };
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (getAccessToken() != null) {
      setLoggedIn(true);
    }
    setTimeout(() => {
      users.delete(1);
      console.log(users);
    }, 5000);
  }, []);

  return (
    <>
      {loggedIn ? <Worksapce /> : <Homepage />}
      <Toaster />
      {/*  <TabsDemo />
      <Essaibutton /> */}
    </>
  );
}

export default App;
