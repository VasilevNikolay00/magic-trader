import { Suspense } from "react"; // 1. Import Suspense
import CardDataOverview from "./CardDataOverview";
import CardVariationCarocel from "./CardVariationCarocel";
import ImageOverview from "../ImageOverview";
import RulingOverview from "../ruling/RulingOverview";
import RulingLoading from "../ruling/RulingLoading"; // 2. Import the skeleton
import CardLinksOverfiew from "./CardLinksOverview";
import { CollectionForm } from "./CollectionForm";
import { checkCollection } from "@/lib/checkCollection";

export default async function CardOverview({ card }) {
  
  const collectionData = await checkCollection(card.cardId);

  return (
    <div className="bg-accent/50 backdrop-blur-xl rounded-2xl shadow-xl flex flex-row gap-2 w-full h-full overflow-hidden p-4">
      <div className="rounded-2xl shadow-xl flex flex-col w-1/3 gap-2 h-full relative justify-center items-center">
        <ImageOverview card={card} />
        <CollectionForm
          cardId={card.cardId}
          currentQuantity={collectionData.data.quantity}
        />
        <CardVariationCarocel id={card.oracleId} cardName={card.name} />
      </div>
      <div className="rounded-2xl flex flex-col h-full w-2/3 gap-2 relative">
        <div className="flex flex-row gap-2 h-7/10">
          <CardDataOverview card={card} />
          <CardLinksOverfiew data={card} />
        </div>
        <div className="h-3/10">
          <Suspense fallback={<RulingLoading />}>
            <RulingOverview oracleId={card.oracleId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}