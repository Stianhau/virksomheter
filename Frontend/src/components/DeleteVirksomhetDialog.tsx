import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "@/api";
import { useState } from "react";
import { Trash } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

type deleteVikrsomheterProps = {
  id: number;
  navn: string;
};

export function DeleteVirksomhetDialog({ id, navn }: deleteVikrsomheterProps) {
  const { getAccessTokenSilently } = useAuth0();
  
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const token = await getAccessTokenSilently()
      await client.DELETE("/Virksomheter/{id}", {
        params: {
          path: {
            id: id,
          },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["virksomheter"],
      });
      setOpen(false);
    }
  });

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} variant="outline" className="hover:bg-red-500">
          <Trash/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete virksomhet</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete virksomhet: {navn}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => {
              deleteMutation.mutate(id);
            }}
          >
            Yes!
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              No!
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
