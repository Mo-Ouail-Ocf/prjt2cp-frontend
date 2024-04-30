import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import styled from "styled-components";
import "./SideBar.css";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SideBarData } from "./SideBarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons";

interface SideBarNavProps {
  sidebar?: string;
}

const Nav = styled.div`
  background: #4b0082;
  height: 80px;
  display: flex;
  justify-content: space-between;
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
const SideBarNav = styled.nav.attrs<SideBarNavProps>(({ sidebar }) => ({
  style: {
    left: sidebar || "-100%", // Default to "-100%" if sidebar is undefined
  },
}))<SideBarNavProps>`
  background: #4b0082;
  width: 200px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  transition: ease-in-out 0.7s;
  z-index: 10;
`;
const SideBarWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;
const Logo = styled.div`
  font-size: 40px;
  color: #f8f4ff;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Lato", sans-serif;
`;

const SideBar = () => {
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
          <NavIcon to="#">
            <FaIcons.FaBars onClick={ShowSideBar} />
          </NavIcon>

          <Logo>TikTa</Logo>

          <DropdownMenu >
            <DropdownMenuTrigger>Open</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Log Out</DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </Nav>

        <SideBarNav sidebar={sidebar ? "0" : undefined}>
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
