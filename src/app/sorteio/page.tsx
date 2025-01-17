import { db } from "@/lib/prisma";
import DrawNumbersPage from "./draw-numbers-page";

export default async function Page() {
  const participants = await db.participant.findMany();

  return <DrawNumbersPage initialParticipants={participants} />;
}
