"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { addParticipantSchema } from "./schema";

interface AddParticipantParamsProps {
  numbers: string;
  fullName: string;
  phone: string;
}

export const addParticipant = async (params: AddParticipantParamsProps) => {
  addParticipantSchema.parse(params);

  const numbersArray = params.numbers
    .split(",")
    .map((num) => num.trim())
    .filter((num) => num !== "");

  const duplicates = numbersArray.filter(
    (item, index) => numbersArray.indexOf(item) !== index,
  );

  if (duplicates.length > 0) {
    throw new Error(
      `Os números ${duplicates.join(
        ", ",
      )} estão duplicados na mesma requisição.`,
    );
  }

  await Promise.all(
    numbersArray.map((number) =>
      db.participant.create({
        data: {
          number,
          firstName: params.fullName.split(" ")[0],
          lastName: params.fullName.split(" ").slice(1).join(" "),
          phone: params.phone,
        },
      }),
    ),
  );

  revalidatePath("/participantes");
};
