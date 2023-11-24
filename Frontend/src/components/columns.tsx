import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { components } from "@/api/v1";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { EditVirksomheter } from "./EditVirksomheter";

export type Virksomhet = components["schemas"]["VirksomhetOutputDto"];

export const columns: ColumnDef<Virksomhet>[] = [
  // {accessorKey: "id", header: "ID"},
  {
    accessorKey: "organisasjonsnummer",
    header: "Organisasjonsnummer",
  },
  {
    accessorKey: "navn",
    header: "Navn",
  },
  {
    accessorKey: "telefon",
    header: "Telefon",
  },
  {
    accessorKey: "epost",
    header: "Email",
  },
  {
    accessorKey: "adresse.poststed",
    header: "Poststed",
  },
  {
    accessorKey: "adresse.postnummer",
    header: "Postnummer",
  },
  {
    accessorKey: "adresse.adresselinje_1",
    header: "Adresse",
  },
  {
    accessorKey: "konkurs",
    header: "Konkurs",
  },
  {
    accessorKey: "underAvvikling",
    header: "Under avvikling",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit virksomhet</Button>
            </DialogTrigger>
            <EditVirksomheter virksomhet={row.original}/>
          </Dialog>
        </>
      );
    },
  },
];
