import v1Client from "@/apiClient";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {  ProjectDisplay, SessionResponse } from "@/apiClient/data-contracts";
import OpenSession from "./OpenSession";


const Session = () => {
    const { sessionId } = useParams();
    const [session, setSession] = useState<SessionResponse>()
    const [project, setProject] = useState<ProjectDisplay>()

    useEffect(() => {
        v1Client.getSessionByIdV1SessionSessionIdGet(sessionId).then(res => {
            setSession(res.data)
            v1Client.getDetailsV1ProjectProjectIdGet(session.project_id).then(res => {
                setProject(res.data)
            }).catch(() => {
                throw new Error("Coudn't fetch session data");
            })
        }).catch(() => {
            throw new Error("Coudn't fetch session data");
        })
    }, [])

    return (
        <>
            {

                session.session_status == "open" ?
                    <OpenSession metadata={session} project={project} />
                    : (
                        session.session_status == "closed" ?
                            null // static
                        :
                        null // unauthorized
                )

            }
        </>
    )
}

export default Session;