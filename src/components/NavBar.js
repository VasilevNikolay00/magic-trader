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
  { title: "Collection", href: "/collection" },
  { title: "Deck Builder", href: "/deckbuilder" },
];

export default function NavBar() {
  const { user } = useAuth();

  return (
    <div className="mt-4 mb-2">
      <nav className="bg-card/50 backdrop-blur-lg rounded-2xl shadow-xl">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left side - Navigation links */}
          <div className="flex items-center gap-2">
            {baseButtons.map((item, i) => (
              <Link href={item.href} key={i}>
                <Button
                  variant="ghost"
                  className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 font-medium"
                >
                  {item.title}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right side - User section */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/50 rounded-lg">
                  <Label className="font-medium text-sm cursor-default">
                    {user.nickname}
                  </Label>
                </div>
                <Link href="/account">
                  <Button
                    variant="default"
                    className="transition-all duration-200 hover:scale-105"
                  >
                    Account
                  </Button>
                </Link>
              </div>
            ) : (
              <div>
                <Button
                  asChild // `asChild` merges the Button's props and styles into its child (the Link)
                  variant="default" // The primary button style
                  className="rounded-r-none transition-all duration-200 hover:scale-105"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  variant="outline" // A secondary style for contrast
                  className="rounded-l-none border-l-0 transition-all duration-200 hover:scale-105"
                >
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
