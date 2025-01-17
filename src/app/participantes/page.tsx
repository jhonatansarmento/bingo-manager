import { db } from "@/lib/prisma";

export default async function ParticipantsPage() {
  const participants = await db.participant.findMany();

  return (
    <div>
      <div className="space-y-6 p-6">
        {/* TÍTULO E BOTÃO */}
        <div className="flex h-full items-center justify-between">
          <h1 className="text-2xl font-bold">Cadastro de Participantes</h1>
          {participants.map((participant) => (
            <div key={participant.id}>
              {participant.firstName} - {participant.phone}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
