import CardDisplay from "@/components/cards/CardDisplay";
import { cardRequest } from "@/lib/cardRequest";

export default async function Page() {
  const data = await cardRequest();
  return (
    <div className=" flex flex-row h-[90%] bg-red justify-center  ">
      <CardDisplay cardData={data.content} />
    </div>
  );
}
