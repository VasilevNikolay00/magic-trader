"use client";
import * as React from "react";
import { useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function RaritySelector() {
  const [value, setValue] = useState(""); // This state will now correctly hold the selected rarity
  const data = ["Common", "Uncommon", "Rare", "Mythic", "Special", "Bonus"];

  return (
    <div className="flex flex-col">
      <Label>Rarity</Label>
      <input type="hidden" name="rarity" value={value}></input>
      <ComboboxSet data={data} value={value} setValue={setValue} />
    </div>
  );
}

function ComboboxSet({ data, value, setValue }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredData = data
    .filter((item) => item.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 10);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between p-6 mt-2"
        >
          {value || "Select rarity..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="PopoverContent">
        <Command>
          <CommandInput
            placeholder="Select rarity..."
            value={search}
            onValueChange={setSearch}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No Rarity found.</CommandEmpty>
            <CommandGroup>
              {filteredData.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={() => {
                    setValue(item);
                    setSearch("");
                    setOpen(false);
                  }}
                >
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
