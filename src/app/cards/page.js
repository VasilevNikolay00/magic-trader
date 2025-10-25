import CardDisplay from "@/components/cards/CardDisplay";
import OrderSelector from "@/components/cards/CardOrderSelector";
import PaginationCardControls from "@/components/cards/PaginationCardControls";
import { cardsRequest } from "@/lib/cardsRequest";

export default async function Page({ searchParams }) {
  let cardData = [];
  let pageData;
  let error = null;

  try {
    const resolvedSearchParams = await searchParams; // This line is the key fix

    const result = await cardsRequest(resolvedSearchParams);

    cardData = result.content;
    pageData = result.page;
  } catch (err) {
    error = err;
    console.error("Failed to fetch card data on server:", err);
  }

  if (error) {
    return (
      <div className="flex flex-row h-[90%] w-full pt-4 bg-red justify-center items-center">
        <p className="text-red-500 text-2xl">Error: {error.message}</p>
      </div>
    );
  }

  if (!cardData || cardData.length === 0) {
    return (
      <div className="flex flex-row h-[90%] w-full pt-4 bg-red justify-center items-center">
        <p className="text-white text-2xl">No cards to display.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-[90%] w-full pt-4 gap-2 items-center relative ">
      <OrderSelector />
      <CardDisplay cardData={cardData} />
      <PaginationCardControls pageData={pageData} />
    </div>
  );
}
