"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DrawHistory } from "./drawHistoryColumns";
import DrawHistoryTable from "./drawHistoryTable";

interface Participant {
  id: number;
  number: string;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: Date;
}

interface DrawNumbersPageProps {
  initialParticipants: Participant[];
}

const DrawNumbersPage = ({
  initialParticipants = [],
}: DrawNumbersPageProps) => {
  const [drawnNumber, setDrawnNumber] = useState<string | null>(null);
  const [winner, setWinner] = useState<Participant | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [participants] = useState<Participant[]>(initialParticipants || []);
  const [drawHistory, setDrawHistory] = useState<DrawHistory[]>([]);

  const handleDraw = async () => {
    if (!participants || participants.length === 0) {
      alert("Não há participantes para sortear!");
      return;
    }

    setIsDrawing(true);

    const drawnNumbers = drawHistory.map((h) => h.number);
    const availableParticipants = participants.filter(
      (p) => !drawnNumbers.includes(p.number),
    );

    if (availableParticipants.length === 0) {
      alert("Todos os números já foram sorteados!");
      setIsDrawing(false);
      return;
    }

    const animationDuration = 2000;
    const startTime = Date.now();

    const animateDrawing = () => {
      if (Date.now() - startTime < animationDuration) {
        const randomParticipant =
          availableParticipants[
            Math.floor(Math.random() * availableParticipants.length)
          ];
        setDrawnNumber(randomParticipant.number);
        requestAnimationFrame(animateDrawing);
      } else {
        const winningParticipant =
          availableParticipants[
            Math.floor(Math.random() * availableParticipants.length)
          ];
        setDrawnNumber(winningParticipant.number);
        setWinner(winningParticipant);

        setDrawHistory((prev) => [
          ...prev,
          {
            number: winningParticipant.number,
            firstName: winningParticipant.firstName,
            lastName: winningParticipant.lastName,
            order: prev.length + 1,
          },
        ]);

        setIsDrawing(false);
      }
    };

    requestAnimationFrame(animateDrawing);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Sorteio de Números</h1>
        <p className="text-lg text-muted-foreground">
          Clique no botão para sortear um número e visualizar o ganhador.
        </p>
      </div>

      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold">Número Sorteado:</h2>
        <div className="text-5xl font-bold text-primary">
          {drawnNumber || "-"}
        </div>
        <p className="text-lg text-muted-foreground">
          Ganhador: {winner ? `${winner.firstName} ${winner.lastName}` : "-"}
        </p>
      </div>

      <Button
        className="w-full max-w-md"
        onClick={handleDraw}
        disabled={isDrawing || drawHistory.length === participants.length}
      >
        {isDrawing ? "Sorteando..." : "Sortear Número"}
      </Button>

      <DrawHistoryTable history={drawHistory} />
    </div>
  );
};

export default DrawNumbersPage;
