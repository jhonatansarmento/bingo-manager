"use client";

import { getStats } from "@/app/actions/get-stats";
import { useEffect, useState } from "react";

const StatsPage = () => {
  const [totalNumbersSold, setTotalNumbersSold] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await getStats();
        setTotalNumbersSold(statsData.totalNumbersSold);
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-6">
      {/* Título */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">Estatísticas do Bingo</h1>
        <p className="text-lg text-muted-foreground">
          Visualize as informações gerais do seu bingo.
        </p>
      </div>

      {/* Estatísticas Resumidas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
        <div className="rounded bg-card p-4 shadow">
          <h2 className="text-xl font-bold">{totalNumbersSold}</h2>
          <p className="text-muted-foreground">Números Vendidos</p>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
