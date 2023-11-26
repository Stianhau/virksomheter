import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { AddVirksomhetForm } from "./AddVirksomhetForm";

export function AddVirksomhetDialog() {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button className="text-2xl px-6">+</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Add virksomhet</DialogTitle>
        <DialogDescription>
          Add a new virksomhet here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <AddVirksomhetForm />
      </div>
    </DialogContent>
    </Dialog>
  );
}
