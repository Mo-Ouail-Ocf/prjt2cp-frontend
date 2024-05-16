import React from "react";
import styled from "styled-components";
import IdeaCard from "@/components/IdeaCard";
import { useIdeaStore } from "@/store/ideaStore";
import { useSessionStore } from "@/store/sessionStore";
import { useWsStore } from "@/store/wsStore";
import Logo from "@/images/logo.svg";
import { Button } from "@/components/ui/button";

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

const IdeaVote = () => {
  const ws = useWsStore((state) => state.ws);
  const session = useSessionStore((state) => state.session);
  const ideaMatrix = useIdeaStore((state) => state.ideaMatrix);
  const expendedIdeas = useIdeaStore((state) => state.expendedIdeas);
  const combinedIdeas = useIdeaStore((state) => state.combinedIdeas);
  const isMod = useSessionStore(
    (state) => state.mods.indexOf(state.userId) >= 0
  );
  const numCols = ideaMatrix[0] ? ideaMatrix[0].length : 0;
  const numRows = ideaMatrix[0] ? ideaMatrix.length : 0;

  const gridStyle = {
    "--num-cols": numCols,
    "--num-rows": numRows,
  } as React.CSSProperties;

  return (
    <div className="w-screen p-4 pr-16 pl-16 flex flex-col justify-around">
      <div className="flex flex-row justify-between p-0">
        <div className="flex flex-row bg-zinc-200 rounded-lg items-center p-2 h-16">
          <img src={Logo} className="h-16 p-2" />
        </div>
        <p className="bg-zinc-200 p-4 rounded-lg font-semibold text-xl content-center">
          {session?.title}
        </p>
        {/* <p className="bg-zinc-200 p-4 rounded-lg text-xl font-semibold content-center"> */}
        {isMod ? (
          <Button
            onClick={() => {
              ws?.closeSession();
            }}
          >
            Close
          </Button>
        ) : null}
      </div>
      <MatriceWrapper>
        <h1>Idea Matrix:</h1>
        <br />
        <Wrapper style={gridStyle}>
          {ideaMatrix.map((row, i) => {
            return (
              <LigneWrap key={i}>
                {row.map((ideaId, j) => {
                  return (
                    <IdeaCard
                      key={i * numCols + j}
                      ideaId={ideaId}
                      showMod={false}
                      showVote={true}
                      showFD={isMod}
                    />
                  );
                })}
              </LigneWrap>
            );
          })}
        </Wrapper>
      </MatriceWrapper>
      <div className="p-8 mb-4 pt-2">
        <h1>Expended Ideas: </h1>
        <br />
        <div className={"grid gap-5 grid-cols-" + ideaMatrix[0].length}>
          {expendedIdeas.map((ideaId) => {
            return (
              <IdeaCard
                ideaId={ideaId}
                showVote={true}
                showMod={false}
                showFD={isMod}
              />
            );
          })}
        </div>
      </div>
      <div className="p-8 mt-4 pt-2">
        <h1>Combined Ideas: </h1>
        <div className={"grid gap-5 grid-cols-" + ideaMatrix[0].length}>
          {Array.from(combinedIdeas.keys()).map((ideaId) => {
            return (
              <IdeaCard
                ideaId={ideaId}
                showVote={true}
                showMod={false}
                showFD={isMod}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IdeaVote;
