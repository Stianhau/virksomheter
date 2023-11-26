import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { EditVirksomhetForm } from "./EditVirksomhetForm";
import { Virksomhet } from "./columns";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";

type editVikrsomheterProps = {
  virksomhet: Virksomhet;
};

export function EditVirksomhetDialog({ virksomhet }: editVikrsomheterProps) {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline"><Pencil/></Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit virksomhet</DialogTitle>
        <DialogDescription>
          Make changes to your virksomhet here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <EditVirksomhetForm
          epost={virksomhet.epost}
          id={virksomhet.id}
          adresse={virksomhet.adresse.adresselinje_1}
          navn={virksomhet.navn}
          organisasjonsnummer={virksomhet.organisasjonsnummer}
          postnummer={virksomhet.adresse.postnummer}
          poststed={virksomhet.adresse.poststed}
          telefon={virksomhet.telefon}
        />
      </div>
    </DialogContent>
    </Dialog>
  );
}
