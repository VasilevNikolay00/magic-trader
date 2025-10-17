import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components = [
  {
    title: "Cards",
    href: "/cards",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Decks",
    href: "/decks",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "DeckBuilder",
    href: "/deckbuilder",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Account",
    href: "/account",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
];

export default function NavBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap m-5 bg-accent rounded-md ">
        <NavigationMenuItem>
          {components.map((item) => (
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle() + " m-2"}
              key={item.title}
            >
              <Link href={item.href}>{item.title}</Link>
            </NavigationMenuLink>
          ))}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
