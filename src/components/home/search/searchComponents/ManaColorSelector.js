"use client";

import { ButtonGroup } from "@/components/ui/button-group";
import Image from "next/image";
const { Button } = require("@/components/ui/button");
const { Label } = require("@radix-ui/react-dropdown-menu");
const { useState } = require("react");
import W from "/public/manaIcons/W.svg";
import U from "/public/manaIcons/U.svg";
import B from "/public/manaIcons/B.svg";
import G from "/public/manaIcons/G.svg";
import R from "/public/manaIcons/R.svg";
import C from "/public/manaIcons/C.svg";

const Images = {
  W: W,
  U: U,
  B: B,
  G: G,
  R: R,
  C: C,
};

export default function ManaColorSelector() {
  const [colorStates, setColorStates] = useState(
    new Map([
      ["W", false],
      ["U", false],
      ["B", false],
      ["R", false],
      ["G", false],
      ["C", false],
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
      .join("");
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
                  ? "dark:bg-primary dark:hover:bg-primary/90"
                  : "dark:bg-accent  dark:hover:bg-input"
              }`}
              onClick={(e) => {
                e.preventDefault();
                toggleColor(color);
              }}
            >
              <Image
                src={Images[color].src}
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
