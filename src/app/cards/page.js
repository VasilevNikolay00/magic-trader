import CardDisplay from "@/components/cards/CardDisplay";
import PaginationCardControls from "@/components/cards/PaginationCardControls";
import { cardRequest } from "@/lib/cardRequest";

export default async function Page({ searchParams }) {
  let cardData = [];
  let pageData;
  let error = null;

  try {
    const result = await cardRequest(searchParams);

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

  console.log(pageData);
  return (
    <div className="flex flex-col h-[90%] w-full pt-4 gap-2 items-center relative ">
      <CardDisplay cardData={cardData} />
      <PaginationCardControls pageData={pageData} />
    </div>
  );
}
