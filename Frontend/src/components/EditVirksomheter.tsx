import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { EditVirksomheterForm } from "./EditVirksomheterForm";
import { Virksomhet } from "./columns";

type editVikrsomheterProps = {
  virksomhet: Virksomhet;
};

export function EditVirksomheter({ virksomhet }: editVikrsomheterProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit virksomhet</DialogTitle>
        <DialogDescription>
          Make changes to your virksomhet here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <EditVirksomheterForm
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
  );
}
