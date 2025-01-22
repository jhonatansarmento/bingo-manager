"use client";

import { getParticipants } from "@/app/actions/get-participants";
import { participantColumns } from "@/app/participantes/columns";
import AddParticipantsButton from "@/components/add-participants-button";
import { DataTable } from "@/components/ui/data-table";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";

interface Participant {
  number: string;
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: Date;
}

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const participantsData: Participant[] = await getParticipants();
        setParticipants(participantsData);
      } catch (err) {
        console.error("Erro ao buscar participantes:", err);
        setError("Erro ao carregar a lista de participantes.");
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  return (
    <div>
      <div className="space-y-6 p-6">
        {/* TÍTULO E BOTÃO */}
        <div className="flex h-full items-center justify-between">
          <h1 className="text-2xl font-bold">Cadastro de Participantes</h1>
          <AddParticipantsButton />
        </div>
        {/* TABELA OU LOADING */}
        <div className="relative">
          {loading ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
              <Spinner />
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <DataTable columns={participantColumns} data={participants} />
          )}
        </div>
      </div>
    </div>
  );
}
