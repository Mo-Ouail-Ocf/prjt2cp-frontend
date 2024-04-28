import Homepage from "./pages/Homepage";
import './App.css'
import { getAccessToken} from "./apiClient/index.ts";
import { useState, useEffect } from "react";
import Worksapce from "./pages/Workspace.tsx";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (getAccessToken() != null) {
      setLoggedIn(true)
    }
  }, [])
  return (
    <>
      {loggedIn ? <Worksapce/> : <Homepage/>}
    </>
  );
}

export default App;
