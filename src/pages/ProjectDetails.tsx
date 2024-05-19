import { Link, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CardDescription } from "@/components/ui/card";
import {
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import brainstorming from "../assets/brainstrom.png";
import brainwriting from "../assets/brainwrite.png";
import {
  ProjectInvitationCreate, SessionResponse,
} from "@/apiClient/data-contracts";
// brain_writing , brain_storming
interface SessionCreate {
  title: string;
  description: string | null;
  /**
   * Ideation Technique
   * @pattern brain_writing|brain_storming
   */
  ideation_technique: string;
  objectives: string | null;
  round_time: number;
  nb_rounds: number;
}
//////zustand
import { useProjectSessionStore } from "@/stores/projectSessionStore";
import { useUserStore } from "@/stores/userStore";

type State = {
  newSession: SessionCreate;
};

const useNewSessionStore = create<State>()(
  immer((_set) => ({
    newSession: {
      title: "",
      description: null,
      ideation_technique: "",
      objectives: null,
      round_time: 0,
      nb_rounds: 1,
    },
  }))
);
/////////////
const ProjectDetails: React.FC = ({}) => {
  const { toast } = useToast();
  const { projectId } = useParams();
  const newSession = useNewSessionStore((state) => state.newSession);
  ////
  /* const [openSessions, setOpenSessions] = useState<SessionResponse[]>([]);
  const [closedSessions, setClosedSessions] = useState<SessionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mailError, setMailError] = useState<string | null>(null);
  const [project, setProject] = useState<ProjectDisplay | null>(null);
  const [user, setUser] = useState<UserResponse>(); */
  //email

  //Zustand :

  const {
    project,
    openSessions,
    closedSessions,
    loadProject,
    errorLoadProject,
    responseInvite,
    getProject,
    editProject,
    createSession,
    inviteUser,
  } = useProjectSessionStore((state) => state);

  const user = useUserStore((state) => state.user);
  const getUser = useUserStore((state) => state.getUser);
  const [email, setEmail] = useState("");
  const [_successMessage, setSuccessMessage] = useState<string | null>(null);

  // session creation

  const [ideationTech, _setIdeationTech] = useState<string>("");
  const sessionRef = useRef<HTMLButtonElement | null>(null);
  const handleCreateSession = async () => {
    if (
      newSession.title == "" ||
      newSession.round_time == 0 ||
      newSession.nb_rounds == 0
    ) {
      toast({
        variant: "destructive",
        title: "Enter session details",
        description: `Please enter session details`,
        action: <ToastAction altText="close">Close</ToastAction>,
      });
      // useNewSessionStore.setState((state) => {
      //   state.newSession = useNewSessionStore.getInitialState().newSession;
      // });
      return;
    }

    //@ts-ignore
    await createSession(parseInt(projectId), newSession);
    useNewSessionStore.setState((state) => {
      state.newSession = useNewSessionStore.getInitialState().newSession;
    });

    toast({
      variant: "default",
      title: "Success",
      description: `New session created`,
      action: <ToastAction altText="close">Close</ToastAction>,
    });
    if (sessionRef.current) {
      sessionRef.current.click();
    }
  };

  //title and description
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const dialogRef = useRef<HTMLButtonElement | null>(null);
  const handleEditProject = async () => {
    //@ts-ignore
    if (
      title === "" ||
      title === null ||
      description === "" ||
      description === null
    ) {
      toast({
        variant: "destructive",
        title: "Invalid title or description",
        description: `Give a new title and description for your project`,
        action: <ToastAction altText="close">Close</ToastAction>,
      });
      return;
    }

    const updatedProject = {
      description: description,
      status: "open",
      title: title,
    };
    if (projectId) await editProject(parseInt(projectId), updatedProject);
    //@ts-ignore

    toast({
      variant: "default",
      title: "Success",
      description: `The project has been updated`,
      action: <ToastAction altText="close">Close</ToastAction>,
    });
    setTitle(null);
    setDescription(null);
    if (dialogRef.current) {
      dialogRef.current.click();
    }

    //@ts-ignore
    /* if (err.status === 404) {
        setError("project not found");
      } else {
        setError("not authorized");
      } */
  };

  const handleInviteUser = async () => {
    try {
      const data: ProjectInvitationCreate = { email };
      //@ts-ignore
      if (email == "") {
        toast({
          variant: "destructive",
          title: "Invalid email adress",
          description: `Enter a valid email adress`,
          action: <ToastAction altText="close">Close</ToastAction>,
        });
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRegex.test(email)) {
        toast({
          variant: "destructive",
          title: "Invalid email address",
          description: `Enter a valid email address of the form: ....@esi.dz`,
          action: <ToastAction altText="close">Close</ToastAction>,
        });
        return;
      }
      if (projectId) await inviteUser(parseInt(projectId), data);
      if (responseInvite === "The user is already invited") {
        toast({
          variant: "destructive",
          title: "The user is already invited",
          description: `An invitation was already sent to ${email}`,
          action: <ToastAction altText="close">Close</ToastAction>,
        });
      } else {
        toast({
          variant: "default",
          title: "Invitation sent",
          description: `An invitation was sent to ${email}`,
          action: <ToastAction altText="close">Close</ToastAction>,
        });
      }
      setEmail("");

      setSuccessMessage("");
    } catch (err) {
      //@ts-ignore
      if (err.status === 404) {
        toast({
          variant: "destructive",
          title: "User not found",
          description: `${email} not found`,
          action: <ToastAction altText="close">Close</ToastAction>,
        });
        //@ts-ignore
      } else if (err.status === 401) {
        toast({
          variant: "destructive",
          title: "Unauthorized",
          description: `Unauthorized to do such action`,
          action: <ToastAction altText="close">Close</ToastAction>,
        });
      }
    }
  };

  //
  const isAdmin = (user_id: number): boolean => {
    return project?.owner_id == user_id;
  };

  useEffect(() => {
    const fetchSessions = async () => {
      if (projectId) {
        await getProject(parseInt(projectId));
      }
      if (user === null) {
        await getUser();
      }
    };
    fetchSessions();
  }, []);

  const sessionDialogRef = useRef<HTMLButtonElement | null>(null);
  const closeDialog = useRef<HTMLButtonElement | null>(null);
  const handleClick = () => {
    if (sessionDialogRef.current) {
      sessionDialogRef.current.click();
    }
    if (closeDialog.current) {
      closeDialog.current.click();
    }
  };

  if (loadProject === true) {
    return (
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 text-center p-4">
        Loading project ...
      </h2>
    );
  }

  if (errorLoadProject) {
    return (
      <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 text-center p-4">
        Error: {errorLoadProject}
      </div>
    );
  }

  interface TableProps {
    sessions: SessionResponse[];
  }

  const SessionTable: React.FC<TableProps> = ({ sessions }) => (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              {" "}
              Objective
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Ideation technique
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sessions.map((session) => (
            <tr key={session.session_id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={`/session/${session.session_id}`}
                        className="text-[#3b82f6] hover:underline font-semibold"
                      >
                        {session.title}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>See session details</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {session.objectives == null ? (
                  <span className="text-gray-400">No objective set</span>
                ) : (
                  session.objectives
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {session.ideation_technique}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
  // Render open and closed sessions in separate tables
  return (
    <div className="p-8">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold mb-4 bg-gradient-to-l from-blue-600 via-blue-400 to-blue-300 text-transparent bg-clip-text">Your Project:</h1>
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit project</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogClose asChild className="hidden">
                {/* @ts-ignore */}
                <Button type="button" variant="secondary" ref={dialogRef}>
                  Close
                </Button>
              </DialogClose>
              <Tabs defaultValue="details" className="w-[450px]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Project details</TabsTrigger>
                  <TabsTrigger value="members">Project members</TabsTrigger>
                  <TabsTrigger value="utilities">Project utilities</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1 space-x-4">
                        <Label htmlFor="name">Title : </Label>
                        <span
                          id="name"
                          className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100"
                        >
                          {project?.title}
                        </span>
                      </div>
                      <div className="space-y-1 space-x-4">
                        <Label htmlFor="username">Description:</Label>
                        <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                          {project?.description}
                        </span>
                      </div>
                      <div className="space-y-1 space-x-4">
                        <Label>Creation date:</Label>
                        {/*@ts-ignore*/}
                        {
                          <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                            {new Date(
                              //@ts-ignore
                              project.creation_date
                            ).toLocaleDateString()}
                          </span>
                        }
                      </div>
                      <div className="space-y-1 space-x-4">
                        <Label>Ressource:</Label>
                        <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                          {project?.resource?.name}
                        </span>
                      </div>
                      <div className="space-y-1 space-x-4">
                        <Label>Ressource description:</Label>
                        <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                          {project?.resource?.description}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="members">
                  <Card>
                    <CardHeader>
                      <CardTitle>Project members</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ScrollArea className="h-72 w-[400px] rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Picture</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Invitation Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {/*@ts-ignore*/}
                            {project.participants.map((participant, index) => (
                              <TableRow key={index}>
                                <TableCell className="rounded-full overflow-hidden w-8 h-8">
                                  {/*@ts-ignore*/}
                                  <img
                                    src={participant.user.image as string}
                                    alt="User"
                                    className="h-10 w-10 rounded-full border-2 border-white bg-white"
                                  />
                                </TableCell>
                                <TableCell>{participant.user.email}</TableCell>
                                <TableCell>{participant.user.name}</TableCell>
                                <TableCell>
                                  {participant.invitation_status}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="utilities">
                  <div className="h-[400px] w-[450px] overflow-hidden hover:overflow-y-auto rounded-md border">
                    <Card>
                      <CardHeader>
                        <CardTitle>Edit project</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="current">Title</Label>
                          {/* @ts-ignore */}
                          <Input
                            id="current"
                            placeholder="Enter the new tilte"
                            defaultValue={project?.title}
                            value={title || ""}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="new">Description</Label>
                          {/* @ts-ignore */}
                          <Input
                            id="new"
                            placeholder="Enter the new description"
                            defaultValue={project?.description || ""}
                            value={description || ""}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleEditProject}>
                          Save modifications
                        </Button>
                      </CardFooter>
                    </Card>
                    <br />
                    <Card>
                      <CardHeader>
                        <CardTitle>Invite user</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Label htmlFor="mail">User email</Label>
                        <Input
                          id="nail"
                          type="email"
                          value={email}
                          placeholder="Enter user email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </CardContent>
                      <CardFooter>
                        <Button onClick={handleInviteUser}>Invite user</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
          <Link
            to={`/visualize/${projectId}`}
            className="text-[#3b82f6] hover:underline font-semibold"
          >
            <Button variant="outline">Visualize project</Button>
          </Link>
          {/* @ts-ignore */}
          {isAdmin(user.id) && (
            <>
              <Dialog>
                <DialogTrigger>
                  <Button>New ideation session</Button>
                </DialogTrigger>
                <DialogContent className="w-[490px] justify-center items-center p-0  ">
                  <Tabs defaultValue="brainstorming" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="brainstorming">
                        Brainstorming
                      </TabsTrigger>
                      <TabsTrigger value="brainwriting">
                        Brainwriting
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="brainstorming" className="mt-5">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-center">
                            <span>Brainstorming</span>
                            <img src={brainstorming} className="w-12 ml-2" />
                          </CardTitle>
                          <CardDescription className=" text-center">
                            Brainstorming is a creative ideation technique that
                            involves group collaboration to generate a large
                            number of ideas that can later be refined and
                            evaluated.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <h2 className="text-center text-xl font-bold">
                            Key aspects:
                          </h2>
                          <ul className="list-disc">
                            <li>
                              Participants share ideas freely in a group
                              setting.
                            </li>
                            <li>All ideas are accepted without criticism.</li>
                            <li>Users can build on each other’s ideas.</li>
                            <li>
                              Moderators guide the session to ensure focus.
                            </li>
                          </ul>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                          <Button
                            onClick={() => {
                              useNewSessionStore.setState((state) => {
                                state.newSession.ideation_technique =
                                  "brain_storming";
                                state.newSession.nb_rounds = 1;
                              });
                              handleClick();
                            }}
                          >
                            New Brainstorming session
                          </Button>
                          <DialogClose asChild className=" hidden">
                            <Button
                              type="button"
                              variant="secondary"
                              ref={closeDialog}
                            >
                              Close
                            </Button>
                          </DialogClose>
                        </CardFooter>
                      </Card>
                    </TabsContent>
                    <TabsContent value="brainwriting" className="mt-5">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-center">
                            <span>Brainwriting</span>
                            <img src={brainwriting} className="w-12 ml-2" />
                          </CardTitle>
                          <CardDescription className=" text-center">
                            Brainwriting is a collaborative ideation technique
                            where participants generate ideas individually
                            before sharing and developing them within a group
                            setting.
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <h2 className="text-center text-xl font-bold">
                            Key aspects:
                          </h2>
                          <ul className="list-disc">
                            <li>Participants generate ideas independently.</li>
                            <li>
                              In rounds, participants build on each other’s
                              ideas.
                            </li>
                            <li>
                              Ideas are written as cards on each user’s sheet.
                            </li>
                            <li>
                              Moderators guide the session to ensure focus.
                            </li>
                          </ul>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                          <Button
                            onClick={() => {
                              useNewSessionStore.setState((state) => {
                                state.newSession.ideation_technique =
                                  "brain_writing";
                              });
                              handleClick();
                            }}
                          >
                            New Brainwriting session
                          </Button>
                          <DialogClose asChild className=" hidden">
                            <Button
                              type="button"
                              variant="secondary"
                              ref={closeDialog}
                            >
                              Close
                            </Button>
                          </DialogClose>
                        </CardFooter>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger
                  asChild
                  className=" hidden"
                  ref={sessionDialogRef}
                >
                  <Button variant="outline">Edit Profile</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>Create new {ideationTech} seesion</DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="sessionTitle" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="sessionTitle"
                        placeholder="Enter the session title"
                        className="col-span-3"
                        value={newSession?.title}
                        onChange={(e) =>
                          useNewSessionStore.setState((state) => {
                            state.newSession.title = e.target.value;
                          })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="sessionDescription"
                        className="text-right"
                      >
                        Description
                      </Label>
                      <Input
                        id="sessionDescription"
                        placeholder="Enter the session description"
                        className="col-span-3"
                        //@ts-ignore
                        value={newSession?.description}
                        onChange={(e) =>
                          useNewSessionStore.setState((state) => {
                            state.newSession.description = e.target.value;
                          })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="sessionObjective" className="text-right">
                        Objective
                      </Label>
                      <Input
                        id="sessionObjective"
                        placeholder="Enter the session objective"
                        className="col-span-3"
                        //@ts-ignore
                        value={newSession?.objectives}
                        onChange={(e) =>
                          useNewSessionStore.setState((state) => {
                            state.newSession.objectives = e.target.value;
                          })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="sessionRoundTime" className="text-right">
                        RoundTime
                      </Label>
                      <Input
                        type="number"
                        id="sessionRoundTime"
                        placeholder="Enter the session round time"
                        className="col-span-3"
                        //@ts-ignore
                        value={newSession?.round_time}
                        onChange={(e) =>
                          useNewSessionStore.setState((state) => {
                            state.newSession.round_time = parseInt(
                              e.target.value
                            );
                          })
                        }
                      />
                    </div>
                    {useNewSessionStore.getState().newSession
                      .ideation_technique == "brain_writing" && (
                      <>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="sessionNbRounds"
                            className="text-right"
                          >
                            Number of rounds
                          </Label>
                          <Input
                            type="number"
                            id="sessionNbRounds"
                            placeholder="Enter the number of rounds for the session"
                            className="col-span-3"
                            //@ts-ignore
                            value={newSession.nb_rounds}
                            onChange={(e) =>
                              useNewSessionStore.setState((state) => {
                                state.newSession.nb_rounds = parseInt(
                                  e.target.value
                                );
                              })
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="submit" onClick={handleCreateSession}>
                        Create new session
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>
      {openSessions.length == 0 && closedSessions.length == 0 && (
        <div className=" h-[80vh] flex items-center justify-center">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 text-center p-4">
            No sessions to display
          </h2>
        </div>
      )}
      {openSessions.length > 0 ? (
        <>
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 text-center p-4">
            Open Sessions :
          </h2>
          <SessionTable sessions={openSessions} />
        </>
      ) : (
        closedSessions.length != 0 && (
          <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 text-center p-4">
            No open sessions to show
          </h2>
        )
      )}
      {closedSessions.length > 0 ? (
        <>
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 text-center p-4">
            Closed Sessions :
          </h2>

          <SessionTable sessions={closedSessions} />
        </>
      ) : (
        openSessions.length != 0 && (
          <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 text-center p-4">
            No closed sessions to show
          </h2>
        )
      )}
    </div>
  );
};

export default ProjectDetails;
