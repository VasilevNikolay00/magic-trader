"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export default function ManaCostSelector() {
  const [value, setValue] = useState([-1]);

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const manaCost = value[0];

  return (
    <div className="w-full space-y-3">
      {manaCost !== -1 && <input type="hidden" name="cmc" value={manaCost} />}

      <Label>Mana Cost</Label>

      <Slider
        min={-1}
        max={19}
        step={1}
        value={value}
        onValueChange={handleValueChange}
      />

      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Selected: {manaCost === -1 ? "Any" : manaCost}</span>
        <span>Max: {19}</span>
      </div>
    </div>
  );
}
