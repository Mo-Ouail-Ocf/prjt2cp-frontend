import {
  BrowserRouter as Router, // Utilisation de BrowserRouter avec un alias Router
  Route,
  Routes, // Utilisation de Routes au lieu de createRoutesFromElements
} from "react-router-dom";
import SideBar from "../components/SideBar";
import { SideBarData } from "../components/SideBarData";
import ProjectDetails from "./ProjectDetails";
const Worksapce = () => {
  return (
      <Router>
          <SideBar />
          <Routes>
            {SideBarData.map((item,index)=>{
              return <Route path={item.path} element={item.element} key={index}/>
            })}
            <Route path="/project/:projectId" element={<ProjectDetails/>} />
          </Routes>
      </Router>

  );
};

export default Worksapce;
