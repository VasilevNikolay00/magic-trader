"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const components = [
  {
    title: "Home",
    href: "/",
  },
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
  {
    title: "Login",
    href: "/login",
  },
];

export default function NavBar() {
  return (
    <div className="mr-5 ml-5 mt-2 bg-card rounded-xl shadow-md">
      <nav className="w-full p-2 opacity-100">
        <div className="flex w-full gap-2">
          {components.map((item, i) => (
            <a href={item.href} key={i}>
              <Button variant="default">{item.title}</Button>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
