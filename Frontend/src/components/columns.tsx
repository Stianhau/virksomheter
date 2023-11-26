import { ColumnDef } from "@tanstack/react-table";
import { components } from "@/api/v1";
import { EditVirksomhetDialog } from "./EditVirksomhetDialog";
import { DeleteVirksomhetDialog } from "./DeleteVirksomhetDialog";

export type Virksomhet = components["schemas"]["VirksomhetOutputDto"];

export const columns: ColumnDef<Virksomhet>[] = [
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
        <div className="flex gap-2">
          <EditVirksomhetDialog virksomhet={row.original}/>
          <DeleteVirksomhetDialog id={row.original.id} navn={row.original.navn}/>
        </div>
      );
    },
  },
];
