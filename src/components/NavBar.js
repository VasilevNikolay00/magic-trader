"use client";
import * as React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { Label } from "./ui/label";
import { logout } from "@/lib/logout";

const baseButtons = [
  { title: "Home", href: "/", requireLogin: false },
  { title: "Cards", href: "/cards", requireLogin: false },
  { title: "Collection", href: "/collection", requireLogin: true },
];

export default function NavBar() {
  const { user } = useAuth();
  return (
    <div className="mt-4 mb-2">
      <nav className="bg-card/50 backdrop-blur-lg rounded-2xl shadow-xl">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left side - Navigation links */}
          <div className="flex items-center gap-2">
            {baseButtons.map((item, i) => {
              // LOGIC: If the item requires login AND the user is not logged in, return null (render nothing).
              if (item.requireLogin && !user) {
                return null;
              }

              // Otherwise, render the button
              return (
                <Link href={item.href} key={i}>
                  <Button
                    variant="ghost"
                    className="hover:bg-accent hover:text-accent-foreground transition-all duration-200 font-medium"
                  >
                    {item.title}
                  </Button>
                </Link>
              );
            })}
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
                <Button
                    variant="secondary"
                    className="transition-all duration-200 hover:scale-105"
                    onClick={()=>logout()}
                  >
                    Logout
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  asChild
                  variant="default"
                  className="rounded-r-none transition-all duration-200 hover:scale-105"
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
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