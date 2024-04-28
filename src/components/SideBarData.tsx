import * as GoIcons from "react-icons/go";
import * as FaIcons from "react-icons/fa";
import * as HiIcons from "react-icons/hi2";
import * as PiIcons from "react-icons/pi";
import * as MdIcons from "react-icons/md";
import Inbox from "../pages/Inbox"
import Home from "../pages/Home";
import ProjectTypes from "../pages/ProjectTypes";
import Project from "../pages/Project";
import HelpCenter from "../pages/HelpCenter";
export const SideBarData =[
    {
        title:"Home",
        path:"/",
        icons:<FaIcons.FaHome/>,
        element:<Home/>

    },
    {
        title:"Inbox",
        path:"/inbox",
        icons:<HiIcons.HiMiniInboxStack/>,
        element:<Inbox/>
    },
    {
        title:"Project Types",
        path:"/project-types",
        icons:<PiIcons.PiProjectorScreenChart/>,
        element:<ProjectTypes/>
    },
    {
       
        title:"Project",
        path:"/project",
        icons:<GoIcons.GoProjectRoadmap/>,
        element : <Project/>
    },
    {
        title : "Help Center",
        path:"/help-center",
        icons:<MdIcons.MdHelpCenter/>,
        element : <HelpCenter/>
    }

]
