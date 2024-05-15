import { SessionResponse } from "@/apiClient/data-contracts";
import Logo from "@/images/logo.svg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/userStore";
import { useSessionStore } from "@/store/sessionStore";
import { useWsStore } from "@/store/wsStore";

const QueuePage = () => {
  const session = useSessionStore((state) => state.session) as SessionResponse;
  const mods = useSessionStore((state) => state.mods);
  const userId = useSessionStore((state) => state.userId);
  const ws = useWsStore((state) => state.ws);
  const usersList = useUserStore((state) => state.userList);
  const users = useUserStore((state) => state.users);

  return (
    <div className="h-screen w-screen p-4 pr-16 pl-16 ">
      <div className="flex flex-row justify-between p-0">
        <div className="flex flex-row bg-zinc-200 rounded-lg items-center p-2 h-16">
          <img src={Logo} className="h-16 p-2" />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">{session.title}</Button>
          </DialogTrigger>
          <DialogContent>
            <Card>
              <CardHeader>
                <CardTitle>Session details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1 space-x-4">
                  <Label htmlFor="name">Title : </Label>
                  <span
                    id="name"
                    className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100"
                  >
                    {session.title}
                  </span>
                </div>
                <div className="space-y-1 space-x-4">
                  <Label htmlFor="username">Description:</Label>
                  {session.description ? (
                    <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                      {session.description}
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                      Not set
                    </span>
                  )}
                </div>
                <div className="space-y-1 space-x-4">
                  <Label>Ideation technique:</Label>
                  {/*@ts-ignore*/}
                  <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                    {session.ideation_technique}
                  </span>
                </div>
                <div className="space-y-1 space-x-4">
                  <Label>Round time:</Label>
                  <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                    {session.round_time} minutes
                  </span>
                </div>
                {session.ideation_technique === "brain_writing" && (
                  <div className="space-y-1 space-x-4">
                    <Label>Number of rounds:</Label>
                    <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                      {session.round_time} rounds
                    </span>
                  </div>
                )}
                <div className="space-y-1 space-x-4">
                  <Label>Objective</Label>
                  {session.objectives ? (
                    <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                      {session.objectives}
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 border border-gray-300 rounded bg-gray-100">
                      Not set
                    </span>
                  )}{" "}
                </div>
              </CardContent>
            </Card>
            <DialogFooter>
              <DialogClose>
                {/* @ts-ignore */}
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {mods.indexOf(userId) >= 0 && (
          <Button
            onClick={() => {
              ws?.startSession();
            }}
          >
            Start the session
          </Button>
        )}
      </div>
      <div className=" p-4 pr-16 pl-16 flex flex-col justify-around">
        <h1 className="text-center font-bold text-2xl">Active users</h1>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Picture</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersList.map((userId, index) => {
                  const user = users.get(userId);
                  return (
                    <TableRow key={index}>
                      <TableCell className="rounded-full overflow-hidden">
                        <img
                          src={user?.pfp}
                          alt=""
                          className="h-10 w-10 rounded-full border-2 border-white bg-white"
                        />
                      </TableCell>
                      <TableCell>{user?.email}</TableCell>
                      <TableCell>{user?.name}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QueuePage;
