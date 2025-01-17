import { participantColumns } from "@/app/participantes/columns";
import AddParticipantsButton from "@/components/add-participants-button";
import { DataTable } from "@/components/ui/data-table";
import { db } from "@/lib/prisma";

export default async function ParticipantsPage() {
  const participants = await db.participant.findMany();

  return (
    <div>
      <div className="space-y-6 p-6">
        {/* TÍTULO E BOTÃO */}
        <div className="flex h-full items-center justify-between">
          <h1 className="text-2xl font-bold">Cadastro de Participantes</h1>
          <AddParticipantsButton />
        </div>
        <DataTable columns={participantColumns} data={participants} />
      </div>
    </div>
  );
}
