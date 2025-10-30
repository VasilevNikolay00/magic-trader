import CardOverview from "@/components/card/CardOverview";
import { card } from "@/lib/card";

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const cardData = await card(resolvedSearchParams.id);

  return (
    <div className="flex flex-col h-[90%] w-full pt-4 gap-2 items-center relative ">
      <CardOverview card={cardData.data} />
    </div>
  );
}
