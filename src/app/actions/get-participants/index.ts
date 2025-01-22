"use server";

import { db } from "@/lib/prisma";

export const getParticipants = async () => {
  try {
    const participants = await db.participant.findMany();
    return participants;
  } catch (error) {
    console.error("Erro ao buscar participantes:", error);
    throw new Error("Erro ao buscar participantes");
  }
};
