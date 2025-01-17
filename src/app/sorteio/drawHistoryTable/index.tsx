"use client";

import { DataTable } from "@/components/ui/data-table";
import { DrawHistory, drawHistoryColumns } from "../drawHistoryColumns";

interface DrawHistoryTableProps {
  history: DrawHistory[];
}

const DrawHistoryTable = ({ history }: DrawHistoryTableProps) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-8 w-full max-w-2xl">
      <h3 className="mb-4 text-xl font-bold">Histórico de Sorteios</h3>
      <DataTable columns={drawHistoryColumns} data={history} />
    </div>
  );
};

export default DrawHistoryTable;
