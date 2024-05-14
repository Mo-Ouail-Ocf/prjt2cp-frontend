/* eslint-disable @typescript-eslint/no-unused-vars */
import { Outlet } from "react-router-dom";
import NewBar from "./NewBar";


interface Props {
  onSignOut: () => void;
}
const HeaderBarLayout = ({onSignOut}: Props) => {
  return (
    <>
    
      
      <NewBar onSignOut={onSignOut}/>

      <Outlet />
    </>
  );
};

export default HeaderBarLayout;
