import { useEffect } from "react";
import styled from "styled-components";
import "../components/SideBar.css";
import styles from "../components/Matrice.module.css";
import IdeaCard from "@/components/IdeaCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserResponse } from "@/apiClient/data-contracts";

/* const ideaProp ={
{ideaId: 52, idea: 'fake data 2', details: 'fake data details 2', submitter: {…}, isMod: false
bgColor:"#cdfc93"
comments:[]
details:"fake data details 2"
handleComment:(comment, ideaId) => {return;}

handleSelect: (ideaId, checked) => {return }

handleVote: (ideaId) => {return }


submitter:{
email: 
"mm_oucherif@esi.dz"
id: 1
name: "Ouail MohammeD"
pfp: 
"https://lh3.googleusercontent.com/a/ACg8ocJZVAcrG0DsT9HBTEZlXcM9fSOFlhG0nJyq7F6-GEvnguIh4qxW=s96-c"
} */

const Titre = styled.div`
  position: absolute;
  font-size: 40px;
  color: #f8f4ff;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Lato", sans-serif;
  left: calc(50% - 374px / 2 + 1px);
`;
const Nav = styled.div`
  background: #4b0082;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
interface CommentInterface {
  user: UserResponse;
  comment: string;
}
interface IdeaCardProps {
  ideaId: number;
  idea: string;
  details: string | null;
  submitter: UserResponse;
  isMod: boolean;
  showVote: boolean;
  bgColor: string;
  comments: CommentInterface[];
  votes: number;
  handleComment: (comment: string, ideaId: number) => void;
  handleVote: (ideaId: number) => void;
  handleSelect: (ideaId: number, checked: boolean | "indeterminate") => void;
}
const Text = styled.div`
  position: absolute;
  font-size: 30px;
  align-items: center;
  font-family: "Lato", sans-serif;
  left: 20px;
`;
const GridCard = styled.div`
  font-size: 20px;
  align-items: center;
  font-family: "Lato", sans-serif;
  align-content: center;
  width: 100%;
`;
const Cards = styled.div`
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  // padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  border-width: 2px;
  border-style: solid;
  border-color: red;
`;
interface Props {
  data: string[][];
}
const CardComponent: React.FC<Props> = ({ data }) => {
  const numRows = data.length;
  const numCols = data[0] ? data[0].length : 0;

  const gridStyle = {
    "--num-cols": numCols,
    "--num-rows": numRows,
  } as React.CSSProperties;
  return (
    <div style={{ margin: "60px 20px" }}>
      <div className={styles.gridcontainer}>
        {data.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.gridrow} style={gridStyle}>
            {row.map((cell, cellIndex) => (
              <Cards key={cellIndex} className={styles.gridcell}>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>{cell}</CardContent>
              </Cards>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
const MatriceBrainwriting = () => {
  const twoDimensionalArray = [
    ["John", "Doe", "30", "40", "80", "100"],
    ["Jane", "Doe", "25", "50", "90", "200"],
    ["Alice", "Smith", "35", "60", "100", "300"],
    ["Alice", "Smith", "35", "60", "100", "300"],
    ["Alice", "Smith", "35", "60", "100", "300"],
    ["Alice", "Smith", "35", "60", "100", "300"],
  ];
  //   const twoDimensionalArray = [
  //     ["John", "Doe", "30", "rewferwf"],
  //     ["Jane", "Doe", "25"],
  //     ["Alice", "Smith", "35"],
  //     ["Alice", "Smith", "35"],
  //     ["Alice", "Smith", "35"],
  //     ["Alice", "Smith", "35"],
  //   ];

  return (
    <>
      <Nav>
        <Titre>Idea Evaluation</Titre>
      </Nav>
      <div>
        <Text>Submitted Idea</Text>
      </div>

      <GridCard>
        <CardComponent data={twoDimensionalArray} />
      </GridCard>
    </>
  );
};

export default MatriceBrainwriting;
