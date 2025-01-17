"use client";

import { ColumnDef } from "@tanstack/react-table";

export interface DrawHistory {
  order: number;
  number: string;
  firstName: string;
  lastName: string;
}

export const drawHistoryColumns: ColumnDef<DrawHistory>[] = [
  {
    accessorKey: "order",
    header: "Posição",
    cell: ({ row }) => {
      return <div>{row.getValue("order")}º</div>;
    },
  },
  {
    accessorKey: "number",
    header: "Número",
  },
  {
    accessorKey: "fullName",
    header: "Ganhador",
    cell: ({ row }) => {
      return <div>{`${row.original.firstName} ${row.original.lastName}`}</div>;
    },
  },
];
