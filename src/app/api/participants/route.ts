import { db } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Busca todos os participantes no banco de dados
    const participants = await db.participant.findMany({
      orderBy: { createdAt: 'desc' }, // Ordena pela data de criação
    });

    // Retorna a lista de participantes
    return NextResponse.json(participants, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar participantes:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar participantes' },
      { status: 500 }
    );
  }
}
