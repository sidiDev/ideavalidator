import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { EllipsisVertical } from "lucide-react";
import { Idea } from "@/app/dashboard/ideas/page";
import { url } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./button";
import { IconLoading } from "../icons";
import axios from "axios";

export default function IdeaCard({
  item,
  ideas,
  setIdeas,
}: {
  item: Idea;
  ideas: Idea[];
  setIdeas: (data: Idea[]) => void;
}) {
  const [isModalOpen, setOpen] = useState<boolean>(false);
  const [isDeleting, setDeleting] = useState<boolean>(false);

  function deleteItem(id: string) {
    setDeleting(true);
    axios.post("/api/methods/delete", { id }).then(({ data }) => {
      if (data.deleted) {
        setIdeas(ideas.filter((item) => item.id != id));
        setDeleting(false);
        setOpen(false);
      }
    });
  }

  return (
    <li className="py-6 flex items-center justify-between">
      <div>
        <Link href={`${url}/p/${item.slug}`} target="blank">
          <h2 className="font-medium text-neutral-700">{item.keyword}</h2>
        </Link>
        <p className="mt-1 text-neutral-600 text-sm">{item.description}</p>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical className="w-5 h-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-neutral-600">
            <DropdownMenuItem asChild>
              <Link href={`${url}/p/${item.slug}`} target="blank">
                View
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Dialog open={isModalOpen} onOpenChange={(e) => setOpen(e)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this Idea?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button size="sm" variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={isDeleting}
              size="sm"
              variant="destructive"
              type="submit"
              className=""
              onClick={() => deleteItem(item.id)}
            >
              {isDeleting ? <IconLoading /> : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </li>
  );
}
