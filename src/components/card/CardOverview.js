import { Suspense } from "react"; // 1. Import Suspense
import CardDataOverview from "./CardDataOverview";
import CardVariationCarocel, {
  CardVariationLoading,
} from "./CardVariationCarocel";
import RulingOverview, { RulingLoading } from "../ruling/RulingOverview";
import CardLinksOverfiew from "./CardLinksOverview";
import { CollectionForm } from "./CollectionForm";
import { checkCollection } from "@/lib/checkCollection";
import CardLegalitiesOverview from "./cardLegalityOverview";
import CardImage from "../CardImage";
import { card } from "@/lib/card";

export default async function CardOverview({ id }) {
  const cardData= await card(id);
  const data = cardData.data;
  const collectionData = await checkCollection(data.cardId);

  return (
    <div className="bg-accent/50 backdrop-blur-xl rounded-2xl shadow-xl flex flex-row gap-2 w-full h-full overflow-hidden p-4">
      <div className="rounded-2xl shadow-xl flex flex-col w-1/3 gap-2 h-full relative justify-center items-center">
        <CardImage card={data} size={"large"} link={false} display={true}/>
        <CollectionForm
          cardId={data.cardId}
          currentQuantity={collectionData.data.quantity}
        />
        <Suspense fallback={<CardVariationLoading />}>
          <CardVariationCarocel id={data.oracleId} cardName={data.name} />
        </Suspense>
      </div>
      <div className="rounded-2xl flex flex-col h-full w-2/3 gap-2 relative">
        <div className="flex flex-row gap-2 h-7/10">
          <CardDataOverview card={data} />
          <CardLinksOverfiew data={data} />
        </div>
        <CardLegalitiesOverview id={data.cardId} />
        <div className="h-3/10">
          <Suspense fallback={<RulingLoading />}>
            <RulingOverview oracleId={data.oracleId} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
