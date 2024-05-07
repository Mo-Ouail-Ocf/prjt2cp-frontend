import { Avatar } from "flowbite-react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import v1Client from "@/apiClient";
import { ProjectDisplay, SessionResponse } from "@/apiClient/data-contracts";

const Wrapper = styled.div`
  display: flex,
  flex-direction: column;
  gap: 50px;
  width: 50%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const Home = () => {
  const [ownedProjects, setOwnedProjects] = useState<ProjectDisplay[]>([]);
  const [participatedProjects, setParticipatedProjects] = useState<
    ProjectDisplay[]
  >([]);
  const [openSessions, setOpenSessions] = useState<SessionResponse[]>([]);
  const [closedSessions, setClosedSessions] = useState<SessionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const [owned, participated] = await Promise.all([
          v1Client.readOwnedProjectsV1ProjectUserOwnedGet(),
          v1Client.readParticipatedProjectsV1ProjectUserParticipatedGet(),
        ]);
        setOwnedProjects(owned.data);
        setParticipatedProjects(participated.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch projects");
        setLoading(false);
        console.error(err);
      }
    };
    fetchProjects();
  }, []);
  return (
    <div
      className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-center p-4"
      style={{
        display: "flex",
        padding: "2rem 2rem",
        textAlign: "center",
        textDecoration: "underline",
      }}
    >
      <Wrapper>
        <h1>Recent Project </h1>
      </Wrapper>
      <Wrapper>
        <h1>Recent Session </h1>
      </Wrapper>
    </div>
  );
};

export default Home;
