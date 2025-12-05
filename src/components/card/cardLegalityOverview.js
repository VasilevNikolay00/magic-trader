"use client";

import { useState, useEffect } from "react";
import { legalities } from "@/lib/legalities";
import { Spinner } from "@/components/ui/spinner"; // Ensure this path matches your project

// --- Constants ---
const MASTER_FORMAT_LIST = [
  { key: "standard", label: "Standard" },
  { key: "future", label: "Future" },
  { key: "historic", label: "Historic" },
  { key: "timeless", label: "Timeless" },
  { key: "gladiator", label: "Gladiator" },
  { key: "pioneer", label: "Pioneer" },
  { key: "modern", label: "Modern" },
  { key: "legacy", label: "Legacy" },
  { key: "pauper", label: "Pauper" },
  { key: "vintage", label: "Vintage" },
  { key: "penny", label: "Penny" },
  { key: "commander", label: "Commander" },
  { key: "brawl", label: "Brawl" },
  { key: "alchemy", label: "Alchemy" },
  { key: "duel", label: "Duel" },
  { key: "oldSchool", label: "Old School" },
  { key: "premodern", label: "Premodern" },
  { key: "predh", label: "Pre-DH" },
  { key: "pauperCommander", label: "Pauper Commander" },
  { key: "oathBreaker", label: "Oathbreaker" },
  { key: "standardBrawl", label: "Standard Brawl" },
];

export default function CardLegalitiesOverview({ id }) {
  // --- State ---
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Effects ---
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      if (!id) return;

      setIsLoading(true);
      setError(null);

      try {
        const result = await legalities(id);
        if (isMounted) {
          setData(result?.data || {});
        }
      } catch (err) {
        console.error("Error fetching legalities:", err);
        if (isMounted) {
          setError("Unable to load legality data.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false;
    };
  }, [id]);

  // --- Render Helpers ---

  // Filter the master list to find only formats where the card is strictly "legal"
  const legalFormats = data
    ? MASTER_FORMAT_LIST.filter((format) => data[format.key] === "legal")
    : [];

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="space-y-2">
        <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          Format Legality
        </p>
        <div className="p-6 bg-accent/30 rounded-lg border flex justify-center items-center">
          <Spinner className="w-6 h-6" />
        </div>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="space-y-2">
        <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          Format Legality
        </p>
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  // --- Success State ---
  return (
    <div className="space-y-3">
      {/* Header with Counter */}
      <div className="flex items-center justify-between">
        <p className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          Format Legality
        </p>
        <span className="text-xs font-medium bg-secondary px-2.5 py-0.5 rounded-full text-muted-foreground">
          {legalFormats.length} Legal
        </span>
      </div>

      {/* Content Area */}
      <div className="p-4 bg-accent/30 rounded-lg border">
        {legalFormats.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {legalFormats.map((format) => (
              <div
                key={format.key}
                className="
                  inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border 
                  text-sm font-medium shadow-sm transition-all 
                "
              >
                <span>{format.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="text-sm text-muted-foreground italic">
              Not Legal in any major format.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
