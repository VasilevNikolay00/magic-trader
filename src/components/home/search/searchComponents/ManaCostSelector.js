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

      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold">Mana Cost (CMC)</Label>
        <div className="px-2.5 py-1 bg-card/10 backdrop-blur-sm border rounded-md">
          <span className="text-sm font-bold">
            {manaCost === -1 ? "Any" : manaCost}
          </span>
        </div>
      </div>

      <div className="py-1">
        <Slider
          min={-1}
          max={19}
          step={1}
          value={value}
          onValueChange={handleValueChange}
          className="cursor-pointer"
        />
      </div>

      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <span className="font-medium">Min:</span>
          <span className="text-foreground/70">Any</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium">Max:</span>
          <span className="text-foreground/70">19</span>
        </div>
      </div>
    </div>
  );
}
