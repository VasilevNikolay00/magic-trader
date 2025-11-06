"use client";
import * as React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { Label } from "./ui/label";

const baseButtons = [
  { title: "Home", href: "/" },
  { title: "Cards", href: "/cards" },
  { title: "Decks", href: "/decks" },
  { title: "Deck Builder", href: "/deckbuilder" },
];

export default function NavBar() {
  const { user } = useAuth();

  return (
    <div className="mr-5 ml-5 mt-2 bg-card rounded-xl shadow-md">
      <nav className="w-full p-2 flex flex-row opacity-100">
        <div className="flex w-full gap-2">
          {baseButtons.map((item, i) => (
            <Link href={item.href} key={i}>
              <Button variant="default">{item.title}</Button>
            </Link>
          ))}
        </div>
        <div className="flex gap-2 justify-end">
          {user ? (
            <div className="flex flex-row gap-4">
              <Label>{user.nickname}</Label>
              <Link href={"/account"}>
                <Button variant="default">Account</Button>
              </Link>
            </div>
          ) : (
            <Link href={"/login"}>
              <Button variant="default">Login</Button>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
