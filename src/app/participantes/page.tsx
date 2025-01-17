'use client';

import { useEffect, useState } from 'react';

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    async function fetchParticipants() {
      try {
        const response = await fetch('/api/participants');
        if (!response.ok) throw new Error('Erro ao buscar participantes');
        const data = await response.json();
        setParticipants(data);
      } catch (error) {
        console.error('Erro ao buscar participantes:', error);
      }
    }

    fetchParticipants();
  }, []);

  return (
    <div>
      <div className='p-6 space-y-6'>
        {/* TÍTULO E BOTÃO */}
        <div className='flex h-full items-center justify-between'>
          <h1 className='text-2xl font-bold'>Cadastro de Participantes</h1>
        </div>

        {/* LISTAGEM DOS PARTICIPANTES */}
        <div className='space-y-2'>
          {participants.length > 0 ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            participants.map((participant: any) => (
              <div key={participant.id} className='p-2 bg-gray-100 rounded'>
                {participant.firstName} - {participant.phone}
              </div>
            ))
          ) : (
            <p>Nenhum participante encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
