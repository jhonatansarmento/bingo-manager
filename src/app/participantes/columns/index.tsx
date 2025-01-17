"use client";

import { Participant } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const participantColumns: ColumnDef<Participant>[] = [
  {
    accessorKey: "number",
    header: "Número da Sorte",
  },
  {
    id: "fullName",
    header: "Nome Completo",
    cell: ({ row }) => {
      const participant = row.original as Participant;
      return `${participant.firstName} ${participant.lastName}`;
    },
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
];
