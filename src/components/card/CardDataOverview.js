import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Image from "next/image";

export default function CardDataOverview({ card }) {
  if (!card) {
    return (
      <Card className="bg-card shadow-xl rounded-2xl w-full max-w-2xl mx-auto h-full flex items-center justify-center">
        <CardContent>
          <p className="text-center text-muted-foreground">
            No card data available.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getLegalities = (card) => {
    // List of keys corresponding to Magic: The Gathering formats
    const formatKeys = [
      "standard",
      "future",
      "historic",
      "timeless",
      "gladiator",
      "pioneer",
      "modern",
      "legacy",
      "pauper",
      "vintage",
      "penny",
      "commander",
      "oathBreaker",
      "standardBrawl",
      "brawl",
      "alchemy",
      "pauperCommander",
      "duel",
      "oldSchool",
      "premodern",
      "predh",
    ];

    const legalities = [];

    // Iterate over the format keys and check the card's status for each
    for (const key of formatKeys) {
      // Check if the card object has the key and its value is 'legal'
      if (card[key] === "legal") {
        // Capitalize the first letter for better formatting
        const formatName = key.charAt(0).toUpperCase() + key.slice(1);
        legalities.push(formatName);
      }
    }

    // Return a comma-separated string of legal formats or a default message
    return legalities.length > 0
      ? legalities.join(", ")
      : "**Not Legal in any format**";
  };

  const renderManaCostSymbols = (cost) => {
    if (!cost) return <span className="text-muted-foreground">N/A</span>;

    const symbols = cost.match(/{[^}]+}/g) || [];

    return (
      <div className="flex items-center gap-0.5">
        {symbols.map((symbol, index) => {
          const char = symbol.replace(/{|}/g, "");
          let imageUrl;

          if (["R", "W", "B", "U", "G", "C", "X"].includes(char)) {
            imageUrl = `/manaIcons/${char.toUpperCase()}.svg`;
          } else {
            return (
              <span key={index} className="text-sm font-bold mx-px">
                {symbol}
              </span>
            );
          }

          return (
            <Image
              key={index}
              src={imageUrl}
              alt={char}
              width={16}
              height={16}
              className="inline-block"
            />
          );
        })}
      </div>
    );
  };

  return (
    <Card className="bg-card/50 shadow-xl rounded-2xl w-full mx-auto h-full overflow-hidden flex flex-col">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-3xl font-bold">{card.name}</CardTitle>
        <CardDescription className="text-base mt-1">
          {card.typeLine}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto space-y-5">
        {/* Mana Cost and CMC */}
        <div className="flex items-center gap-6 p-3 bg-accent/30 rounded-lg border">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm">Mana Cost:</p>
            {renderManaCostSymbols(card.manaCost)}
          </div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm">CMC:</p>
            <p className="text-base font-bold text-primary">{card.cmc}</p>
          </div>
        </div>

        {/* Oracle Text */}
        <div className="space-y-2">
          <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Oracle Text
          </p>
          <div className="p-4 bg-accent/30 rounded-lg border">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">
              {card.oracleText || "N/A"}
            </p>
          </div>
        </div>

        {/* Card Details Grid */}
        <div className="space-y-2">
          <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Card Details
          </p>
          <div className="grid grid-cols-2 gap-3 p-4 bg-accent/30 rounded-lg border">
            <div>
              <p className="font-semibold text-xs text-muted-foreground mb-1">
                Set
              </p>
              <p className="text-sm">
                {card.setName} ({card.set.toUpperCase()})
              </p>
            </div>
            <div>
              <p className="font-semibold text-xs text-muted-foreground mb-1">
                Rarity
              </p>
              <p className="capitalize text-sm">{card.rarity}</p>
            </div>
            <div>
              <p className="font-semibold text-xs text-muted-foreground mb-1">
                Artist
              </p>
              <p className="text-sm">{card.artist || "N/A"}</p>
            </div>
            <div>
              <p className="font-semibold text-xs text-muted-foreground mb-1">
                Released
              </p>
              <p className="text-sm">
                {new Date(card.releasedAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="font-semibold text-xs text-muted-foreground mb-1">
                Colors
              </p>
              <p className="text-sm">{card.colors || "Colorless"}</p>
            </div>
            <div>
              <p className="font-semibold text-xs text-muted-foreground mb-1">
                Color Identity
              </p>
              <p className="text-sm">{card.colorIdentity || "Colorless"}</p>
            </div>
            <div className="col-span-2">
              <p className="font-semibold text-xs text-muted-foreground mb-1">
                Keywords
              </p>
              <p className="text-sm">{card.keywords || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Legalities */}
        <div className="space-y-2">
          <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Format Legality
          </p>
          <div className="p-4 bg-accent/30 rounded-lg border">
            <p className="text-sm leading-relaxed">{getLegalities(card)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
