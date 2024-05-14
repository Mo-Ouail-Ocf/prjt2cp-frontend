/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import styled from "styled-components";
import IdeaCard from "./IdeaCard";
import fakeIdea from "./test";
import img from "../images/luffy.webp";
import { Avatar, CustomFlowbiteTheme, Flowbite } from "flowbite-react";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;
const MatriceWrapper = styled.div`
  margin: 1rem 2rem 5rem 2rem;
  height: 100%;
  box-sizing: border-box;
`;


const LigneWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(var(--num-cols, 1), 1fr);
  gap: 20px;
  height: 100%;
  box-sizing: border-box;
`;
const AvatarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(var(--num-cols, 1), 1fr);
  gap: 20px;
  height: 100%;
  box-sizing: border-box;
  place-content: center;
  align-items: center;
`;
const customTheme: CustomFlowbiteTheme = {
  avatar: {
    root: {
      size: {
        lg: "h-12 w-12",
      },
    },
  },
};

const NewMatrice = () => {
  const fake = fakeIdea;
  const numCols = fake[0] ? fake[0].length : 0;
  const numRows = fake[0] ? fake.length : 0;

  const gridStyle = {
    "--num-cols": numCols,
    "--num-rows": numRows,
  } as React.CSSProperties;

  return (
    <>
      
      <MatriceWrapper>
        <AvatarWrapper style={gridStyle }>
          {fake[0].map((user, i) => {
            return (
              <Flowbite theme={{ theme: customTheme }}>
                <Avatar
                  key={i}
                  style={{ margin: "1rem" }}
                  img={img}
                  bordered
                  rounded
                  size="lg"
                  placeholderInitials="RR"
                ></Avatar>
              </Flowbite>
            );
          })}
        </AvatarWrapper>

        <Wrapper style={gridStyle}>
          {fake.map((row, i) => {
            return (
              <LigneWrap key={i}>
                {row.map((idea, j) => {
                  return <IdeaCard key={i * numCols + j} {...idea}  />;
                })}
              </LigneWrap>
            );
          })}
        </Wrapper>
      </MatriceWrapper>
     
    </>
  );
};

export default NewMatrice;
