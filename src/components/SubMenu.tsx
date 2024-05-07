import { Link } from "react-router-dom";
import styled from "styled-components";
import { SideBarData } from "./SideBarData";
interface Props {
  item: (typeof SideBarData)[number];
  OnShow: () => void;
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
  &:hover {
    background: #b57edc;
    border-left: 5px solid #8450a9;
    cursor: pointer;
  }
`;
const SideBarLabel = styled.span`
  margin: 16px;
  font-family: "Quattrocento Sans", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 20px;
`;
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

`;

const SubMenu = ({ item, OnShow }: Props) => {
  return (
    <>
      <div onClick={OnShow}>
        <SideBarLink to={item.path}>
          <Wrap>
            {item.icons}
            <SideBarLabel>{item.title}</SideBarLabel>
          </Wrap>
        </SideBarLink>
      </div>
    </>
  );
};

export default SubMenu;
