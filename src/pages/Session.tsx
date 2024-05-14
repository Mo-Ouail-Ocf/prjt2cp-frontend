import v1Client from "@/apiClient";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProjectDisplay, SessionResponse } from "@/apiClient/data-contracts";
import Unauthorized from "./Unauthorized";
import OpenSession from "./OpenSession";
import ClosedSession from "./ClosedSession";

const Session = () => {
  const { session_id } = useParams();
  const [session, setSession] = useState<SessionResponse | null>(null);
  const [project, setProject] = useState<ProjectDisplay | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        if (session_id != null) {
          setLoading(true); // Start loading
          const [sessionResponse] = await Promise.all([
            v1Client.getSessionByIdV1SessionSessionIdGet(Number(session_id)),
          ]);
          setSession(sessionResponse.data);

          const projectResponse =
            await v1Client.getDetailsV1ProjectProjectIdGet(
              sessionResponse.data.project_id
            );
          setProject(projectResponse.data);
          setLoading(false);
        } else {
          setError("no project id found");
        }
      } catch (err) {
        setError("Failed to fetch sessions");
        setLoading(false);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <>
      {session?.session_status == "open" ? (
        <OpenSession session={session} project={project as ProjectDisplay} />
      ) : session?.session_status == "closed" ? (
        <ClosedSession session_id={parseInt(session_id)} />
      ) : (
        <Unauthorized />
      )}
    </>
  );
};

export default Session;
