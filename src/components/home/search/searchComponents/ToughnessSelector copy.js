import { Slider } from "@/components/ui/slider";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

export default function TougnessSelector() {
  const [value, setValue] = useState([-1, 15]);
  return (
    <div className="w-full space-y-3">
      <input type="hidden" name="tougness" value={value}></input>
      <Label>Tougness</Label>
      <Slider value={value} onValueChange={setValue} max={15} step={1} />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Min: {value[0] === -1 ? "_/X" : value[0]}</span>
        <span>Max: {value[1] === 15 ? "+15" : value[1]}</span>
      </div>
    </div>
  );
}
