"use client";

import { ButtonGroup } from "@/components/ui/button-group";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

// 1. Remove imports.
// 2. Define the paths as strings (relative to the public folder).
const Images = {
  W: "/manaIcons/W.svg",
  U: "/manaIcons/U.svg",
  B: "/manaIcons/B.svg",
  G: "/manaIcons/G.svg",
  R: "/manaIcons/R.svg",
  C: "/manaIcons/C.svg",
};

export default function ColorSelector() {
  const [colorStates, setColorStates] = useState(
    new Map([
      ["B", false],
      ["C", false],
      ["G", false],
      ["R", false],
      ["U", false],
      ["W", false],
    ])
  );

  const toggleColor = (color) => {
    setColorStates(() => {
      const newMap = new Map(colorStates);
      newMap.set(color, !newMap.get(color));
      return newMap;
    });
  };

  const getActiveColors = () => {
    return Array.from(colorStates.keys())
      .filter((color) => colorStates.get(color))
      .join(",");
  };

  return (
    <div>
      <input type="hidden" name="colors" value={getActiveColors()} />
      <Label>Colors</Label>
      <div className="flex mt-1 flex-wrap gap-2 w-full justify-">
        <ButtonGroup className={"w-full "}>
          {Array.from(colorStates.keys()).map((color) => (
            <Button
              key={color}
              variant={"colorless"}
              className={`text-xl border size-15 flex-1 relative ${
                colorStates.get(color)
                  ? "bg-primary backdrop-blur-sm hover:bg-primary/90"
                  : "bg-card/10 backdrop-blur-sm hover:bg-input"
              }`}
              onClick={(e) => {
                e.preventDefault();
                toggleColor(color);
              }}
            >
              {/* 3. Use Images[color] directly (remove .src) */}
              <Image
                src={Images[color]}
                alt={color}
                fill
                className="object-contain p-2"
              />
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
}