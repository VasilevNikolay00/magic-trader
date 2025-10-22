"use client";

import { Slider } from "@/components/ui/slider";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

export default function TougnessSelector() {
  const DEFAULT_MIN_POWER = -1;
  const DEFAULT_MAX_POWER = 15;
  const [value, setValue] = useState([DEFAULT_MIN_POWER, DEFAULT_MAX_POWER]);

  function returnValue(value) {
    if (value[0] === DEFAULT_MIN_POWER && value[1] === DEFAULT_MAX_POWER) {
      return "";
    }

    return value.join(",");
  }

  return (
    <div className="w-full space-y-3">
      <input type="hidden" name="tougness" value={returnValue(value)}></input>
      <Label>Tougness</Label>
      <Slider value={value} onValueChange={setValue} max={15} step={1} />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Min: {value[0] === -1 ? "_/X" : value[0]}</span>
        <span>Max: {value[1] === 15 ? "+15" : value[1]}</span>
      </div>
    </div>
  );
}
