import { Link } from "react-router-dom";
import styled from "styled-components";
import { SideBarData } from "./SideBarData";
interface Props {
  item: (typeof SideBarData)[number];
  OnShow :()=>void ,
}
const SideBarLink = styled(Link)`
  display: flex;
  color: #f8f4ff;
  text-decoration: none;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 60px;
  list-style: none;
  font-size: 18px;
  &:hover {
    background: #b57edc;
    border-left: 5px solid #8450a9;
    cursor: pointer;
  }
`;
const SideBarLabel = styled.span`
  margin: 16px;
`;

const SubMenu = ({ item, OnShow  }: Props) => {
  return (
    <>
    <div onClick={OnShow}>
      <SideBarLink to={item.path} >
        <div>
          {item.icons}
          <SideBarLabel>{item.title}</SideBarLabel>
          </div>
      </SideBarLink>
      </div>
    </>
  );
};

export default SubMenu;
