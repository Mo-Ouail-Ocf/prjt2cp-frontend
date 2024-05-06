import v1Client from "@/apiClient";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  ProjectDisplay, SessionResponse } from "@/apiClient/data-contracts";
import OpenSession from "./OpenSession";

interface Metadata {
  session: SessionResponse,
  project: ProjectDisplay,
}

const Session = () => {
    const { sessionId } = useParams();
    const [metadata, setMetadata] = useState<Metadata>()


    useEffect(() => {
        let session: SessionResponse;
        v1Client.getSessionByIdV1SessionSessionIdGet(sessionId).then(res => {
            session = res.data
        }).catch(() => {
            throw new Error("Coudn't fetch session data");
        })
        let project: ProjectDisplay;
        v1Client.getDetailsV1ProjectProjectIdGet(session.project_id).then(res => {
            project = res.data
        }).catch(() => {
            throw new Error("Coudn't fetch session data");
        })
        setMetadata({
            sesssion: session,
            project: project
        })
    }, [])

    return (
        <>
            {
                metadata.session.session_status == "open" ?
                    <OpenSession metadata={metadata.session} project={metadata.project} />
                    : (
                        metadata.session.session_status == "closed" ?
                            null // static
                        :
                        null // unauthorized
                )

            }
        </>
    )
}

export default Session;