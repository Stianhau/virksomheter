import { ColumnDef } from "@tanstack/react-table"
import { Button } from "./ui/button"
import { components } from "@/api/v1"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export type Virksomhet = components["schemas"]["Virksomhet"];

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
    accessorKey: "adresse.adresselinje_1",
    header: "Adresse",
  },
  {
    id: "actions",
    cell: ({row}) => <Button onClick={() => console.log(row.original)}>View</Button>,
  },
]
