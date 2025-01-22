import { getParticipants } from "@/app/actions/get-participants";
import DrawNumbersPage from "./draw-numbers-page";

export default async function Page() {
  const participants = await getParticipants();

  return <DrawNumbersPage initialParticipants={participants} />;
}
