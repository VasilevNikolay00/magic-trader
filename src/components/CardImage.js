"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link for client-side navigation
import { Spinner } from "./ui/spinner";

export default function CardImage({
  card,
  size = "normal",
  link = true,
  display = false,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [mounted, setMounted] = useState(false);

  const ImageParams = {
    large: { url: card.imageUrisLarge },
    normal: { url: card.imageUrisNormal },
    small: { url: card.imageUrisSmall },
  };

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
    setMounted(false);
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, [card.id, card.name]);

  const Container = link ? Link : "div";

  const containerProps = link ? { href: `/card?id=${card.id}` } : {};

  const interactiveClasses = link
    ? "cursor-pointer hover:scale-105 hover:z-50 hover:shadow-2xl hover:bg-primary/90 border-3"
    : "";

  const hasImage = card.imageUrisNormal && card.imageUrisNormal !== "N/A";

  return hasImage ? (
    <div
      className={`relative rounded-xl transform transition-all duration-300 ${display ? "w-[80%] h-[80%]" : "w-full h-full"} ${interactiveClasses} ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <Container
        {...containerProps}
        className="flex flex-col justify-between bg-accent text-accent-foreground p-1 rounded-2xl transition-colors"
        style={{ aspectRatio: "63 / 88" }}
      >
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-card via-accent to-gray-900">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner className="size-10 text-primary" />
            </div>
          )}
          {!imageError ? (
            <Image
              src={ImageParams[size]?.url || ImageParams.normal.url}
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
      </Container>
    </div>
  ) : (
    <div
      className={`relative rounded-xl transform transition-all duration-300 ${display ? "w-[80%] h-[80%]" : "w-full h-full"} ${interactiveClasses} ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <Container
        {...containerProps}
        className="flex flex-col justify-between bg-accent text-accent-foreground p-1 rounded-2xl transition-colors"
        style={{ aspectRatio: "63 / 88" }}
      >
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-card via-accent to-gray-900">
          <h1 className="text-lg font-bold mb-2">{card.name}</h1>
          <p className="text-sm">Colors: {card.colors || "N/A"}</p>
          <p className="text-sm">Cost: {card.manaCost || "N/A"}</p>
          <p className="text-sm">Set: {card.setName || "N/A"}</p>
          <p className="text-sm">Types: {card.typeLine || "N/A"}</p>
          <p className="text-sm">Rarity: {card.rarity || "N/A"}</p>
          <p className="text-sm">Oracle Text: {card.oracleText || "N/A"}</p>
          <p className="text-xs mt-4 text-left">
            Artist: {card.artist || "N/A"}
          </p>
        </div>
      </Container>
    </div>
  );
}
