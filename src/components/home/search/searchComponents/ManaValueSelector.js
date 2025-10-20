import { Slider } from "@/components/ui/slider";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";

export default function ManaValueSelector() {
  const [value, setValue] = useState([0, 15]);
  return (
    <div className="w-full space-y-3">
      <input type="hidden" name="manaCost" value={value}></input>
      <Label>Mana Cost</Label>
      <Slider value={value} onValueChange={setValue} max={15} step={1} />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Min: {value[0]}</span>
        <span>Max: {value[1] === 15 ? "+15" : value[1]}</span>
      </div>
    </div>
  );
}
