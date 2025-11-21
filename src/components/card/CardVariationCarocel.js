// components/CardVariationCarousel.jsx
import { cardsRequest } from "@/lib/cardsRequest";
import Image from "next/image";
import CardImage from "../CardImage";

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
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!data || data.length === 1) {
    return (
      <div
        style={{ aspectRatio: "63 / 88" }}
        className="flex overflow-x-auto justify-center items-center space-x-2 bg-card/50 backdrop-blur-2xl p-2 h-full rounded-lg shadow-inner w-full"
      >
        <span className="text-2xl text-shadow-2xs text-accent-foreground">
          No variations found for {cardName}.
        </span>
      </div>
    );
  }

  return (
    <div className="flex overflow-x-auto space-x-2 bg-card/50 backdrop-blur-2xl p-2 h-full w-full rounded-lg shadow-inner">
      {data.map((card) => (
        <div key={card.cardId || card.id} className="flex h-full">
          <CardImage size="small" card={card}></CardImage>
        </div>
      ))}
    </div>
  );
}
