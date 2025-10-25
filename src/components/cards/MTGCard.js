"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MTGCard({ card }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
    setMounted(false);

    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, [card.id, card.name]);
  return card.imageUrisNormal && card.imageUrisNormal != "N/A" ? (
    <div
      className={`relative rounded-4xl transform transition-all duration-500 hover:scale-105 hover:z-50 hover:shadow-2xl ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <a
        href={`/card?id=${card.id}`}
        className="flex flex-col justify-between bg-accent text-accent-foreground p-1 rounded-2xl hover:bg-primary/90"
        style={{ aspectRatio: "488 / 680" }}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-200">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
          )}

          <Image
            src={card.imageUrisNormal}
            alt={card.name || "Magic Card"}
            fill
            className={`transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
            sizes="(max-width: 488px) 100vw, (max-width: 680px) 50vw, 33vw"
          />
        </div>
      </a>
    </div>
  ) : (
    <div
      className={`relative rounded-2xl bg-card transform transition-all duration-500 hover:scale-105 hover:z-50 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <a
        href={`/card?id=${card.id}`}
        className="flex flex-col justify-between text-accent-foreground p-4 rounded-2xl"
        style={{ aspectRatio: "384 / 535" }}
      >
        <div className="overflow-auto">
          <h1 className="text-lg font-bold mb-2">{card.name}</h1>
          <p className="text-sm">Colors: {card.colors || "N/A"}</p>
          <p className="text-sm">Cost: {card.manaCost || "N/A"}</p>
          <p className="text-sm">Set: {card.setName || "N/A"}</p>
          <p className="text-sm">Types: {card.typeLine || "N/A"}</p>
          <p className="text-sm">Rarity: {card.rarity || "N/A"}</p>
          <p className="text-sm">Oracle Text: {card.oracleText || "N/A"}</p>
        </div>
        <p className="text-xs mt-4 text-left">Artist: {card.artist || "N/A"}</p>
      </a>
    </div>
  );
}
