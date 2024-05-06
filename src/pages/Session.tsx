import WSClient from "@/apiClient/ws"
import { BroadCast, SysEventBroadcast, Vote } from "@/apiClient/ws-data-contracts";
import { CommentResponse, IdeaResponse, ProjectDisplay, SessionResponse, UserResponse } from "@/apiClient/data-contracts";
import { ReactElement, useState, useEffect } from "react";
import Brainstorming from "./Brainstorming";
import v1Client, { getAccessToken } from "@/apiClient";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";


interface SessionProps {
  metadata: SessionResponse,
  project: ProjectDisplay,
}


const Session = (props: SessionProps) => {
  const navigate = useNavigate();
  const [mods, setMods] = useState<number[]>([]); // list of mods
  const [userId, setUserId] = useState<number>(0); // current user

  const [users, setUsers] = useState<Map<number, UserResponse>>(new Map());
  const [usersList, setUsersList] = useState<number[]>([]); // a list of session usrers
  const [ideas, setIdeas] = useState<Map<number, IdeaResponse>>(new Map());
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [colors, setColors] = useState<Map<number, string>>(new Map());
  const [chatMsgs, setChatMsgs] = useState<[]>([]);
  const [ideaMatrix, setIdeaMatrix] = useState<number[][]>([[]])

  const [started, setStarted] = useState<boolean>(false);
  const [steps, setSteps] = useState<ReactElement[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0)


  const enventHanlder = (data: BroadCast) => {
    // TODO: chat, combined_idea, final_decision
    switch (data.type) {
      case "chat":
        break;
      case "idea": {
        ideas.set((data.content as IdeaResponse).idea_id, data.content as IdeaResponse)
        setIdeas(ideas)
        break;
      }
      case "combined_idea":
        break;
      case "comment": {
        comments.push(data.content as CommentResponse)
        setComments(comments)
        break;
      }
      case "vote": {
        const idea = ideas.get((data.content as Vote).idea_id) as IdeaResponse
        if (idea.votes == null) {
          idea.votes = 0;
        }
        idea.votes++;
        setIdeas(ideas);
        break;
      }
      case "sys_event": {
        handleSysEvent(data.content as SysEventBroadcast)
        break;
      }
      case "final_decision":
        break;
    }
  }

  const addUser = (userId: number): UserResponse => {
    usersList.push(userId)
    setUsersList(usersList)

    let user = users.get(userId);

    if (user == undefined) {
      v1Client.getUserByIdV1UserUserIdGet(userId).then(res => {
        user = res.data;
        users.set(userId, user);
        setUsers(users);
      }).catch(() => {
        throw new Error("Unable to retreive user data");
      })
    }

    return user as UserResponse;
  }

  const handleSysEvent = (event: SysEventBroadcast) => {
    switch (event.event) {
      case "start": {
        const colorList = [ "cdfc93", "ffb1b1", "fff9c4", "b3e5fc", "f8bbd0", "e1bee7", ]
        usersList.map((userId, index) => {
          colors.set(userId, colorList[index]);
          setColors(colors);
        })
        setStarted(true)
        break;
      }
      case "join": {
        const userId = event.users[0];
        const user = addUser(userId);
        toast({
          title: "Session Info",
          description: user.name + " joined the session!",
        })
        break;
      }
      case "joined": {
        for (let userId of event.users) {
          addUser(userId)
        }
        break;
      }
      case "quit": {
        if (! started) {
          const index = usersList.indexOf(event.users[0]);
          if (index > -1) {
            usersList.splice(index, 1);
          }
          setUsersList(usersList)
        }

        const user = users.get(event.users[0])
        toast({ title: "Session Info",
          description: (user as UserResponse).name + " left the session!",
        })
        break;
      }
      case "close": {
        ws.disconnet()
        navigate("/session/"+props.metadata.session_id);
        navigate(0);
        break;
      }
      case "next": {
        setCurrentStep(currentStep + 1) 
        break;
      }
    }
  }
  const [ws, setWs] = useState<WSClient>(new WSClient(props.metadata.session_id, enventHanlder));


  useEffect(() => {
    v1Client.currentV1UserCurrentGet().then(res => {
      setUserId(res.data.id)
      users.set(userId, res.data);
      setUsers(users);
    }).catch(() => {
      throw new Error("Coudn't fetch user data");
      
    })


    // init mods list
    let mods: number[] = [];
    // props.project.participants?.filter(user => {user.role == "moderator"}).map(user => {tmp.push(user.user.user_id)}) // mods
    mods.push(props.project.owner_id) // the Admin
    setMods(mods);

    // init steps
    switch (props.metadata.ideation_technique) {
      case "brain_writing": {
        const BWProps = {
          metadata: props.metadata,
          users: users,
          usersList: usersList,
          ideas: ideas,
          colors: colors,
          comments: comments,
          handleComment: (comment: string, ideaId: number) => { ws.sendComment(ideaId, comment) },
          handleIdea: (content: string, details: string, parent_idea_id: number | null) => { ws.sendIdea(content, details, parent_idea_id) },
          handlePhaseEnd: () => {
            setCurrentStep(currentStep + 1) 
          },
          handleRoundEnd: () => {
            // TODO: build the matrix
          },
        }

        setSteps([
        // TODO: add the steps

        ])
        break;
      }

      case "brain_storming": {
        const BSProps = {
          metadata: props.metadata,
          users: users,
          ideas: ideas,
          colors: colors,
          comments: comments,
          handleComment: (comment: string, ideaId: number) => { ws.sendComment(ideaId, comment) },
          handleIdea: (content: string, details: string) => { ws.sendIdea(content, details, null) },
          handlePhaseEnd: () => {
            let rows = Math.sqrt(ideas.size)
            if (! Number.isInteger(rows)) {
              rows = Math.trunc(rows) + 1
            }

            let i = 0;
            let j = 0;

            ideas.forEach((_, key) => {
              ideaMatrix[i][j] = key
              j++;
              if (j >= rows) {
                j = 0;
                i++;
              }
            })

            setIdeaMatrix(ideaMatrix)
            setCurrentStep(currentStep + 1) 
          },
        }

        setSteps([
          <Brainstorming {...BSProps} />,
          // TODO: add other steps

        ])
        break;
      }
    }



    ws.connect(getAccessToken() as string)
  }, [])

  const queueProps = {
    isMod: mods.indexOf(userId) >= 0,
    metadata: props.metadata,
    users: users,
    colors: colors,
    handleStart: () => {
      ws.startSession()
    }
  }

  return (
    <>
      {
        started ?
          steps[currentStep]
          :
          // <Queue {...queueProps} />
          null
      }
    </>
  );
};

export default Session;
