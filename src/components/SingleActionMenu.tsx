import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useIdeaStore } from "@/store/ideaStore";

interface Props {
  handleAction: (content: string, details: string) => void;
  action: string;
  ideaId: number;
  children: any;
  disabled: boolean;
}

const SingleActionMenu = (props: Props) => {
  const ideas = useIdeaStore((state) => state.ideas);

  const [ideaContent, setIdeaContent] = useState<string>("");
  const [ideaDetails, setIdeaDetails] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: any) => {
    props.handleAction(ideaContent, ideaDetails);
    setOpen(false);
    e.preventDefault();
  };

  if (props.disabled) {
    return props.children;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{ideas.get(props.ideaId)?.content}</DialogTitle>
          <DialogDescription>
            {ideas.get(props.ideaId)?.details}
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <div className="">
            <Label htmlFor="idea">Your idea</Label>
            <Input
              id="idea"
              placeholder="Enter idea content"
              value={ideaContent}
              onChange={(e) => setIdeaContent(e.target.value)}
            />
          </div>
          <br />
          <div className="">
            <Label htmlFor="details">Idea details</Label>
            <Input
              id="Idea details"
              placeholder="Enter idea details"
              value={ideaDetails}
              onChange={(e) => setIdeaDetails(e.target.value)}
            />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <DialogFooter>
            <Button type="submit">{props.action}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SingleActionMenu;
