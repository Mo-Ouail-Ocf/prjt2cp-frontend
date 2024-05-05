import { Link, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import v1Client from "@/apiClient";
import {
  ProjectDisplay,
  ProjectCreate,
  SessionSchema,
  ProjectUpdate,
} from "@/apiClient/data-contracts";
import { SessionResponse } from "@/apiClient/data-contracts";
import { UserResponse } from "@/apiClient/data-contracts";
import { Button } from "@/components/ui/button";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import brainstorming from "../assets/brainstrom.png";
import brainwriting from "../assets/brainwrite.png";
import {
  ProjectInvitationCreate,
  ProjectInvitationResponse,
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
const ProjectDetails: React.FC = ({}) => {
  const { toast } = useToast();
  const { projectId } = useParams();

  ////
  const [openSessions, setOpenSessions] = useState<SessionResponse[]>([]);
  const [closedSessions, setClosedSessions] = useState<SessionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mailError, setMailError] = useState<string | null>(null);
  const [project, setProject] = useState<ProjectDisplay | null>(null);
  const [user, setUser] = useState<UserResponse>();
  //email
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // session creation
  const [ideationTech, setIdeationTech] = useState<string>("");
  const sessionRef = useRef<HTMLDivElement | null>(null);
  const [newSession, setNewSession] = useState<SessionCreate>({
    title: "",
    description: null,
    ideation_technique: "",
    objectives: null,
    round_time: 0,
    nb_rounds: 0,
  });
  /*  const updateSessionTitle = (newTitle: string) => {
    setSession({ ...session, sessionTitle: newTitle });
  }; */
  const handleCreateSession = async () => {
    if (ideationTech === "brain_storming") {
      setNewSession({ ...newSession, nb_rounds: 1 });
    }
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
      setNewSession({
        title: "",
        description: null,
        ideation_technique: "",
        objectives: null,
        round_time: 0,
        nb_rounds: 1,
      });
      return;
    }
    try {
      //@ts-ignore
      console.log(newSession);
      newSession.ideation_technique = ideationTech;
      setNewSession(newSession);
      console.log(newSession);

      const response =
        await v1Client.createASessionV1SessionProjectProjectIdPost(
          //@ts-ignore
          parseInt(projectId),
          newSession
        );
      setNewSession({
        title: "",
        description: null,
        ideation_technique: "",
        objectives: null,
        round_time: 0,
        nb_rounds: 1,
      });
      console.log(response.data);
      toast({
        variant: "default",
        title: "Success",
        description: `New session created`,
        action: <ToastAction altText="close">Close</ToastAction>,
      });
      if (sessionRef.current) {
        sessionRef.current.click();
      }
    } catch (error) {}
  };

  //title and description
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
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
    try {
      const updatedProject: ProjectUpdate = {
        description: description,
        status: "open",
        title: title,
      };
      const response = await v1Client.updateProjectV1ProjectProjectIdPut(
        //@ts-ignore
        parseInt(projectId),
        updatedProject
      );
      //@ts-ignore
      setProject({ ...project, title: title, description: description });
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
    } catch (err) {
      //@ts-ignore
      if (err.status === 404) {
        setError("project not found");
      } else {
        setError("not authorized");
      }
    }
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

      const response = await v1Client.inviteV1ProjectProjectIdInvitePut(
        //@ts-ignore
        parseInt(projectId),
        data
      );
      console.log(response.data);
      setSuccessMessage(response.data.message);
      if (response.data.message === "The user is already invited") {
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
      setMailError(null);
      setSuccessMessage("");
    } catch (err) {
      //@ts-ignore
      if (err.status === 404) {
        setMailError("User or project not found");
        toast({
          variant: "destructive",
          title: "User not found",
          description: `${email} not found`,
          action: <ToastAction altText="close">Close</ToastAction>,
        });
        //@ts-ignore
      } else if (err.status === 401) {
        setMailError("Unauthorized access");
        toast({
          variant: "destructive",
          title: "Unauthorized",
          description: `Unauthorized to do such action`,
          action: <ToastAction altText="close">Close</ToastAction>,
        });
      } else {
        setMailError("Failed to invite user: Unexpected error occurred");
      }
    }
  };

  //
  const isAdmin = (user_id: number): boolean => {
    return project?.owner_id == user_id;
  };

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        if (projectId != null) {
          const [open, closed, details, client] = await Promise.all([
            v1Client.getOpenSessionsForAProjectV1SessionProjectProjectIdGet(
              parseInt(projectId)
            ),
            v1Client.getClosedSessionsForAProjectV1SessionProjectProjectIdClosedGet(
              parseInt(projectId)
            ),
            v1Client.getDetailsV1ProjectProjectIdGet(parseInt(projectId)),
            v1Client.currentV1UserCurrentGet(),
          ]);
          setOpenSessions(open.data);
          setClosedSessions(closed.data);
          setUser(client.data);
          setProject(details.data);

          setLoading(false);
        } else {
          throw new Error("no project id found");
        }
      } catch (err) {
        setError("Failed to fetch sessions");
        setLoading(false);
        console.error(err);
      }
    };

    fetchSessions();
  }, [projectId]);

  const sessionDialogRef = useRef<HTMLDivElement | null>(null);
  const closeDialog = useRef<HTMLDivElement | null>(null);
  const handleClick = () => {
    if (sessionDialogRef.current) {
      sessionDialogRef.current.click();
    }
    if (closeDialog.current) {
      closeDialog.current.click();
    }
  };

  if (loading) {
    return <div>Loading sessions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
                        className="text-purple-700 hover:underline font-semibold"
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
        <h1 className="text-2xl font-bold mb-4">Your Project:</h1>
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
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
                        <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                          {new Date(project.creation_date).toLocaleDateString()}
                        </span>
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
                                    src={participant.user.image}
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
                  <ScrollArea className="h-[400px] w-[450px] rounded-md border">
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
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="new">Description</Label>
                          {/* @ts-ignore */}
                          <Input
                            id="new"
                            placeholder="Enter the new description"
                            defaultValue={project?.description}
                            value={description}
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
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
          <Button variant="outline">Visualize project</Button>
          {/* @ts-ignore */}
          {isAdmin(user.id) && (
            <>
              <Dialog>
                <DialogTrigger>
                  <Button>New ideation session</Button>
                </DialogTrigger>
                <DialogContent className="w-[490px]">
                  <Tabs defaultValue="brainstorming" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="brainstorming">
                        Brainstorming
                      </TabsTrigger>
                      <TabsTrigger value="brainwriting">
                        Brainwriting
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="brainstorming">
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
                              setIdeationTech("brain_storming");
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
                    <TabsContent value="brainwriting">
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
                              setIdeationTech("brain_writing");
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
                          setNewSession({
                            ...newSession,
                            title: e.target.value,
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
                          setNewSession({
                            ...newSession,
                            description: e.target.value,
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
                          setNewSession({
                            ...newSession,
                            objectives: e.target.value,
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
                          setNewSession({
                            ...newSession,
                            round_time: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    {ideationTech === "brain_storming" && (
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
                              setNewSession({
                                ...newSession,
                                nb_rounds: parseInt(e.target.value),
                              })
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleCreateSession}>
                      Create new session
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-center p-4">
        Open Sessions
      </h2>
      <SessionTable sessions={openSessions} />
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-center p-4">
        Closed Sessions
      </h2>

      <SessionTable sessions={closedSessions} />
    </div>
  );
};

export default ProjectDetails;
