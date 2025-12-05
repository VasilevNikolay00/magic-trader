// components/CardVariationCarousel.jsx
import { cardsRequest } from "@/lib/cardsRequest";
import Image from "next/image";
import CardImage from "../CardImage";
import { Spinner } from "@/components/ui/spinner"; 

// --- The Main Async Component ---
export default async function CardVariationCarousel({ id, cardName }) {
  let data = [];
  let error = null;

  try {
    const variationsResponse = await cardsRequest({
      oracleId: id,
      size: 1000,
    });
    data = variationsResponse.content;
  } catch (e) {
    console.error("Failed to fetch card variations:", e);
    error = "Failed to load card variations.";
  }

  if (error) {
    return <div className="text-red-500 p-4 text-sm">{error}</div>;
  }

  if (!data || data.length <= 1) {
    return (
      <div
        style={{ aspectRatio: "63 / 88" }}
        className="flex overflow-x-auto justify-center items-center space-x-2 bg-card/50 backdrop-blur-2xl p-2 h-full rounded-lg shadow-inner w-full"
      >
        <span className="text-sm text-center text-muted-foreground px-4">
          No variations found.
        </span>
      </div>
    );
  }

  return (
    <div className="flex overflow-x-auto space-x-2 bg-card/50 backdrop-blur-2xl p-2 h-full w-full rounded-lg shadow-inner scrollbar-hide">
      {data.map((card) => (
        // Added Wrapper Div here:
        <div 
          key={card.cardId || card.id} 
          className="h-full aspect-[63/88] shrink-0"
        >
          <CardImage size="small" card={card} />
        </div>
      ))}
    </div>
  );
}

export function CardVariationLoading() {
  return (
    <div className="flex overflow-x-auto space-x-2 bg-card/50 backdrop-blur-2xl p-2 h-full w-full rounded-lg shadow-inner">
      {[...Array(5)].map((_, i) => (
        <div 
          key={i} 
          className="h-full aspect-[63/88] shrink-0 bg-accent/20 animate-pulse rounded-xl flex items-center justify-center border border-white/5"
        >
          {i === 0 && <Spinner className="opacity-50" />}
        </div>
      ))}
    </div>
  );
}