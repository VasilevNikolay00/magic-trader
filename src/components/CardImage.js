"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CardImage({ card, size }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [mounted, setMounted] = useState(false);

  const ImageParams = {
    large: {
      url: card.imageUrisLarge,
    },
    normal: {
      url: card.imageUrisNormal,
    },
    small: {
      url: card.imageUrisSmall,
    },
  };

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
    setMounted(false);
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, [card.id, card.name]);

  return card.imageUrisNormal && card.imageUrisNormal != "N/A" ? (
    <div
      className={`relative rounded-xl transform transition-all duration-300 h-full hover:scale-105 hover:z-50 hover:shadow-2xl ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <a
        href={`/card?id=${card.id}`}
        className="flex flex-col justify-between bg-accent text-accent-foreground h-full p-1 rounded-2xl hover:bg-primary/90"
        style={{ aspectRatio: "63 / 88" }}
      >
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-card via-accent to-gray-900">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-card to-red-500 rounded-full blur-xl opacity-50" />
                <div className="relative bg-card rounded-lg p-4">
                  <div className="w-8 h-8 border-4 border-red-200 border-t-red-600 rounded-full animate-spin" />
                </div>
              </div>
            </div>
          )}
          {!imageError ? (
            <Image
              src={ImageParams[size].url}
              alt={card.name || "Magic Card"}
              fill
              className={`object-cover transition-opacity duration-700 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
              sizes="(max-width: 488px) 100vw, (max-width: 680px) 50vw, 33vw"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
              <div>
                <p className="text-gray-400 text-sm mb-2">Image unavailable</p>
                <p className="text-gray-500 text-xs">{card.name}</p>
              </div>
            </div>
          )}
        </div>
      </a>
    </div>
  ) : (
    <div
      className={`relative rounded-2xl overflow-hidden bg-card transform transition-all h-full duration-300 hover:scale-105 hover:z-50 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <a
        href={`/card?id=${card.id}`}
        className="flex flex-col justify-between text-accent-foreground h-full p-4 rounded-2xl overflow-auto"
        style={{ aspectRatio: "384 / 535" }}
      >
        <div className="overflow-auto h-full">
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
