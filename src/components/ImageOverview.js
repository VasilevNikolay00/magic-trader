"use client";
import Image from "next/image";
import { useState } from "react";

export default function ImageOverview({ card }) {
  const [imageError, setImageError] = useState(false);

  const imageSrc =
    imageError || !card.imageUrisLarge || card.imageUrisLarge === "N/A"
      ? "/placeholder.webp"
      : card.imageUrisLarge;

  return (
    <div
      className={`relative rounded-2xl bg-card border-2 border-accent h-[80%] w-[80%]`}
      style={{ aspectRatio: "63 / 88" }}
    >
      <Image
        src={imageSrc}
        alt={card.name || "Magic Card"}
        fill
        className="relative rounded-2xl bg-card/1 transition-opacity duration-500"
        onError={() => setImageError(true)}
        loading="lazy"
        sizes="(max-width: 488px) 100vw, (max-width: 680px) 50vw, 33vw"
      />
    </div>
  );
}
