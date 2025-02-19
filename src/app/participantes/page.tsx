"use client";

import { getParticipants } from "@/app/actions/get-participants";
import { participantColumns } from "@/app/participantes/columns";
import AddParticipantsButton from "@/components/add-participants-button";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
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
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

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

  const paginatedData = participants.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const totalPages = Math.ceil(participants.length / pageSize);

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
            <>
              <DataTable columns={participantColumns} data={paginatedData} />
              <Pagination>
                <PaginationContent className="mt-4 flex justify-center gap-4">
                  <PaginationItem>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      Anterior
                    </Button>
                  </PaginationItem>
                  <PaginationItem>
                    <span className="px-4">
                      Página {currentPage} de {totalPages}
                    </span>
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Próximo
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
