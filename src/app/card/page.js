import CardOverview from "@/components/card/CardOverview";
import { card } from "@/lib/card";
import { rulingRequest } from "@/lib/ruling";
import { getAuthenticatedUser } from "@/lib/auth"; // 1. Import your auth helper

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  const user = await getAuthenticatedUser();

  const cardData = await card(resolvedSearchParams.id);
  const rulingData = await rulingRequest({ id: cardData.data.oracleId });

  return (
    <div className="flex flex-col h-[90%] w-full pt-4 gap-2 items-center relative ">
      {/* 3. Pass the user down to your component */}
      <CardOverview 
        card={cardData.data} 
        rulingData={rulingData} 
        user={user} 
      />
    </div>
  );
}