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
    <div className=" bg-accent/50 backdrop-blur-xl rounded-2xl shadow-xl flex flex-row gap-2 w-full h-full overflow-hidden p-4">
      <div className="rounded-2xl shadow-xl flex flex-col w-1/3 gap-2 h-full relative">
        <ImageOverview card={card} />
        <CardVariationCarocel id={card.oracleId} cardName={card.name} />
      </div>
      <div className=" rounded-2xl  flex flex-col h-full w-2/3 gap-2 relative">
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
