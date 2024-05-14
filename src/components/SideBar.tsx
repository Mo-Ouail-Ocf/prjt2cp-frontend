/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SideBarData } from "./SideBarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons";
import Logos from "../images/logo.svg";
import ProfileIcon from "./ProfileIcon";
const Nav = styled.div`
  background: #3b82f6;
  height: 80px;
  width: 100%;
  top: 0;
  display: flex;
  position: sticky;
  justify-content: space-between;
  z-index: 10;
  align-items: center;
`;
const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const SideBarNav = styled.nav<{ sidebar: boolean }>`
  background:hsl(var(--primary));
  border-radius: 0%;
  width: 200px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: ease-in-out 0.7s;
  z-index: 10;
`;
const SideBarWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;
const NavWrapper = styled.div`
 
`;
const Logo = styled.div`
  font-size: 40px;
  color: #f8f4ff;
  height: 60px;
  
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Quattrocento";
  margin: auto;
`;
const DropM = styled.div`
  margin-right: 2rem;
  box-sizing: border-box;
`;
interface Props {
  onSignOut: () => void;
}
const SideBar = ({onSignOut}:Props) => {
  const [sidebar, setSidebar] = useState(false);
  const ShowSideBar = () => {
    setSidebar(true);
  };
  const HideSideBar = () => {
    setSidebar(false);
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#d6cadd" }}>
        <Nav>
          <NavWrapper>
            <NavIcon to="#">
              <FaIcons.FaBars onClick={ShowSideBar} />
            </NavIcon>
          </NavWrapper>
          <Logo>
            <img
              src={Logos}
              alt="logo"
              style={{ height: "50px", marginRight: "10px" }}
            />
            TikTa
          </Logo>
          <DropM>
          <ProfileIcon onSignOut={onSignOut} />
          </DropM>
        </Nav>

        <SideBarNav sidebar={sidebar}>
          <SideBarWrapper>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={HideSideBar} />
            </NavIcon>
            {SideBarData.map((item, index) => {
              return (
                <SubMenu item={item} key={index} OnShow={HideSideBar}></SubMenu>
              );
            })}
          </SideBarWrapper>
        </SideBarNav>
      </IconContext.Provider>
    </>
  );
};

export default SideBar;
