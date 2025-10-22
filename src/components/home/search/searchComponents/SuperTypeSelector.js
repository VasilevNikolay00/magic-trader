"use client";
import * as React from "react";
import { useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
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
import { Button } from "@/components/ui/button";

export default function SuperTypeSelector() {
  const [type, setType] = useState(""); // This state will now correctly hold the selected rarity
  const data = ["Basic", "Legendary", "Snow", "Host", "Ongoing", "World"];

  return (
    <div className="flex flex-col">
      <Label>Super Type</Label>
      <input type="hidden" name="superType" value={type}></input>
      <ComboboxSet data={data} type={type} setType={setType} />
    </div>
  );
}

function ComboboxSet({ data, type, setType }) {
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
          {type || "Select super type..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="PopoverContent">
        <Command>
          <CommandInput
            placeholder="Search super type..."
            value={search}
            onValueChange={setSearch}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No type found.</CommandEmpty>
            <CommandGroup>
              {filteredData.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={() => {
                    setType(item);
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
