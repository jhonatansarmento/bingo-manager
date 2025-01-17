'use client';

import { useEffect, useState } from 'react';

const StatsPage = () => {
  const [stats, setStats] = useState({
    totalParticipants: 0,
    totalNumbers: 1000, // Número total (fixo para 1-1000 no bingo)
    drawnNumbers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Simulação: Substituir por uma chamada real à API
        const participants = await fetch('/api/participants');
        const participantsData = await participants.json();

        // Calcula os números sorteados com base nos participantes cadastrados
        const drawnNumbers = participantsData.length;

        setStats({
          totalParticipants: participantsData.length,
          totalNumbers: 1000, // Número total fixo
          drawnNumbers,
        });
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center space-y-8 p-6'>
      {/* Título */}
      <div className='text-center'>
        <h1 className='text-4xl font-bold'>Estatísticas do Bingo</h1>
        <p className='text-lg text-muted-foreground'>
          Visualize as informações gerais do seu bingo.
        </p>
      </div>

      {/* Estatísticas Resumidas */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <div className='p-4 bg-card rounded shadow'>
          <h2 className='text-xl font-bold'>{stats.totalParticipants}</h2>
          <p className='text-muted-foreground'>Participantes</p>
        </div>
        <div className='p-4 bg-card rounded shadow'>
          <h2 className='text-xl font-bold'>{stats.totalNumbers}</h2>
          <p className='text-muted-foreground'>Números Totais</p>
        </div>
        <div className='p-4 bg-card rounded shadow'>
          <h2 className='text-xl font-bold'>{stats.drawnNumbers}</h2>
          <p className='text-muted-foreground'>Números Sorteados</p>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
