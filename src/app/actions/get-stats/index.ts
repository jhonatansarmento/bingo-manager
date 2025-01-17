"use server";

import { db } from "@/lib/prisma";

export const getStats = async () => {
  const totalNumbersSold = await db.participant.count();

  return {
    totalNumbersSold,
  };
};
