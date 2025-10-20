"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const components = [
  {
    title: "Cards",
    href: "/cards",
  },
  {
    title: "Decks",
    href: "/decks",
  },
  {
    title: "Deck Builder",
    href: "/deckbuilder",
  },
  {
    title: "Account",
    href: "/account",
  },
];

export default function NavBar() {
  return (
    <div className="mr-5 ml-5 mt-2 bg-card rounded-xl shadow-md">
      <nav className="w-full p-2 opacity-100">
        <div className="flex w-full gap-2">
          {components.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center justify-center rounded-md w-1/14 py-1 border  bg-accent font-bold transition",
                "hover:bg-accent/70 active:bg-primary-foreground hover:text-accent-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
