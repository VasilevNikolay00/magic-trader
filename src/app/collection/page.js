import CardDisplay from "@/components/cards/CardDisplay";
import OrderSelector from "@/components/cards/CardOrderSelector";
import PaginationCardControls from "@/components/cards/PaginationCardControls";
import { card } from "@/lib/card";
import { cardsRequest } from "@/lib/cardsRequest";
import { getCollection } from "@/lib/getCollection";

export default async function Page() {
  let error;
  let cardData;
  let pageData;

  try {
    const result = await getCollection();
    cardData=result.data.content;
    pageData=result.data.page;

  } catch (err) {
    error = err;
    console.error("Failed to fetch card data on server:", err);
  }

  if (error) {
    return (
      <div className="flex flex-row h-[90%] bg-red justify-center items-center">
        <p className="text-red-500 text-2xl">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-[90%] pt-4 gap-2 items-center relative ">
      <OrderSelector/>
      <CardDisplay cardData={cardData} />
      <PaginationCardControls pageData={pageData} />
    </div>
  );
}
