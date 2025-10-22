import CardDisplay from "@/components/cards/CardDisplay";
import { cardRequest } from "@/lib/cardRequest";

const cardData = cardRequest();
export default function Page() {
  return (
    <div>
      <CardDisplay />
    </div>
  );
}
