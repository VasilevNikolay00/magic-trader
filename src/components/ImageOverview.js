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
      className="relative rounded-xl bg-card border-2 border-card "
      style={{ aspectRatio: "63 / 88" }}
    >
      <Image
        src={imageSrc}
        alt={card.name || "Magic Card"}
        fill
        className="relative bg-accent rounded-4xl bg-card transition-opacity duration-500"
        onError={() => setImageError(true)}
        loading="lazy"
        sizes="(max-width: 488px) 100vw, (max-width: 680px) 50vw, 33vw"
      />
    </div>
  );
}
