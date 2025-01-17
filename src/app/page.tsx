"use client";

import AddParticipantDialog from "@/components/add-participants-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-6">
      {/* Título e Introdução */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Bem-vindo ao Gerenciador de Bingo
        </h1>
        <p className="text-lg text-muted-foreground">
          Escolha uma ação para começar a gerenciar o seu bingo.
        </p>
      </div>

      {/* Botões de Ação */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* Botão para abrir o modal de adicionar participante */}
        <AddParticipantDialog />

        <Button asChild className="w-full">
          <Link href="/participantes">Visualizar Participantes</Link>
        </Button>
        <Button asChild className="w-full">
          <a href="/sorteio">Sortear Números</a>
        </Button>
        <Button asChild>
          <Link href="/estatisticas">Estatísticas</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
