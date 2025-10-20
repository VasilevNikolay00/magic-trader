"use client";

import * as React from "react";
import { useState } from "react";
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
import { Label } from "@radix-ui/react-dropdown-menu";
import data from "@/components/home/search/data/keyWordsData.json";

export default function KeyWordsSelector() {
  const [subType, setSubType] = useState("");
  return (
    <div>
      <Label>Key Words</Label>
      <input type="hidden" name="keyWorld" value={subType} />
      <ComboboxSet data={data} subType={subType} setSubType={setSubType} />
    </div>
  );
}

function ComboboxSet({ data, subType, setSubType }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selection, SetSelection] = useState("");

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
          {subType || "Select key word..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="PopoverContent">
        <Command>
          <CommandInput
            placeholder="Search key word..."
            onValueChange={setSearch}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No key words found.</CommandEmpty>
            <CommandGroup>
              {filteredData.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={() => {
                    setSubType(item);
                    SetSelection(selection + ", " + item);
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
