"use server";

import { db } from "@/lib/prisma";

export const getUsedNumbers = async (): Promise<number[]> => {
  const participants = await db.participant.findMany({
    select: { number: true },
  });
  return participants.map((participant) => Number(participant.number));
};
