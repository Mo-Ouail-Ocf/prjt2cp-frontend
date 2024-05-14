/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CiLogout, CiSaveDown1 } from "react-icons/ci";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/userStore";
import "./Profile.css";
import { Avatar, CustomFlowbiteTheme, Flowbite, Label } from "flowbite-react";
import ProfilePage from "@/pages/ProfilePage";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { UserResponse } from "@/apiClient/data-contracts";
import v1Client from "@/apiClient";
import { ToastAction } from "./ui/toast";
import { useToast } from "./ui/use-toast";
interface Props {
  onSignOut: () => void;
}
const customTheme: CustomFlowbiteTheme = {
  avatar: {
    root: {
      size: {
        lg: "h-12 w-12",
      },
    },
  },
};

const ProfileIcon = ({ onSignOut }: Props) => {
  /////The Store
  const {
    user,
    loadUser,
    errorUser,
    successUser,
    getUser,
    modifyUserName,
    loadUpdate,
    successUpdate,
  } = useUserStore((state) => state);
  //////////////

  //shadcnui
  const { toast } = useToast();
  //
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const getCurr = async () => {
      await getUser();
    };
    getCurr();
  }, []);
  const submit = async () => {
     
    await modifyUserName(name);
    if (successUpdate) {
      toast({
        variant: "default",
        title: "Success",
        description: "Your username is updated",
        action: <ToastAction altText="close">Close</ToastAction>,
      });
    }
  };
  return (
    <>
      <Sheet>
        <SheetTrigger>
          {
            <Flowbite theme={{ theme: customTheme }}>
              <Avatar
                img={user?.pfp}
                bordered
                status="online"
                rounded
                size="lg"
              ></Avatar>
            </Flowbite>
          }
        </SheetTrigger>
        <SheetContent
          style={{ zIndex: "1000", width: "320px", padding: "20px" }}
        >
          <SheetHeader>
            <SheetTitle
              style={{
                fontFamily: "Fontbold",
                textAlign: "center",
                paddingTop: "1rem",
              }}
            >
              {user?.name}'s
              {<br />}
              {<span style={{ fontFamily: "Fontsemi" }}>Profile</span>}
            </SheetTitle>
            <SheetDescription style={{ fontFamily: "Fontregular" }}>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-4 py-4">
            <Avatar img={user?.pfp} bordered rounded size="xl"></Avatar>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mail" className="text-right">
                Mail:
              </Label>
              <span
                id="name"
                className="inline-block px-3 py-1 border col-span-3 border-gray-300 rounded bg-white"
                style={{ fontFamily: "Fontregular" }}
              >
                {user?.email}
              </span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username:
              </Label>
              <Input
                id="username"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                value={name}
                style={{ fontFamily: "Fontregular" }}
                placeholder="Enter a new name"
                defaultValue={user?.name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="col-span-3"
              />
            </div>
          </div>
          <SheetFooter
            style={{
              display: "flex",
              marginTop: "2rem",
              // justifyContent: "space-between",
              // gap: "1rem",
            }}
          >
            <SheetClose asChild className="m-0">
              <Button
                type="submit"
                className="flex p-0 m-0  w-36 gap-2"
                onClick={submit}
              >
                <CiSaveDown1 />
                Save changes
              </Button>
            </SheetClose>
            <SheetClose asChild className="m-0">
              <Button
                variant="destructive"
                onClick={() => {
                  onSignOut();
                  navigate("/");
                }}
                className="flex gap-2 p-0 ml-0 w-36"
              >
                <CiLogout />
                Sign Out
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProfileIcon;
