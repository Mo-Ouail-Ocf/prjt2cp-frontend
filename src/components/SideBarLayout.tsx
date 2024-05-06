import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const SideBarLayout = () => {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};

export default SideBarLayout;
