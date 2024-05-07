import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
interface Props {
  onSignOut: () => void;
}
const SideBarLayout = ({onSignOut}: Props) => {
  return (
    <>
      <SideBar onSignOut={onSignOut}/>
      <Outlet />
    </>
  );
};

export default SideBarLayout;
