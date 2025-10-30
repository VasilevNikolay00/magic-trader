import CardDataOverview from "./CardDataOverview";
import CardVariationCarocel from "./CardVariationCarocel";
import ImageOverview from "../ImageOverview";
import { rulingRequest } from "@/lib/ruling";
import RulingOverview from "./RulingOverview";
import CardLinksOverfiew from "./CardLinksOverview";

export default async function CardOverview({ card }) {
  const rulingData = await rulingRequest({ id: card.oracleId });
  console.log(card);
  return (
    <div className="flex flex-row gap-4 w-[90%] h-full bg-card overflow-hidden rounded-2xl p-4">
      <div className="flex flex-col w-1/3 gap-2 h-full relative bg-card rounded-2xl">
        <ImageOverview card={card} />
        <CardVariationCarocel id={card.oracleId} cardName={card.name} />
      </div>
      <div className="flex flex-col h-full w-2/3 gap-2 relative bg-card">
        <div className="flex flex-row gap-2 h-7/10">
          <CardDataOverview card={card} />
          <CardLinksOverfiew data={card} />
        </div>
        <div className="h-3/10">
          <RulingOverview data={rulingData} />
        </div>
      </div>
    </div>
  );
}
