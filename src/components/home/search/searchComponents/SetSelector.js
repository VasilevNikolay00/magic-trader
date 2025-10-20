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
import setData from "@/components/home/search/data/setData.json";

export default function SetSelector() {
  const [setCode, setSetCode] = useState(""); // for <input name="set">
  const [setName, setSetName] = useState(""); // for display only

  return (
    <div className="flex flex-col">
      <Label htmlFor="terms">Set</Label>
      <input type="hidden" name="set" value={setCode} />
      <ComboboxSet
        setData={setData}
        setCode={setSetCode}
        setName={setName}
        setSetName={setSetName}
      />
    </div>
  );
}

function ComboboxSet({ setData, setCode, setName, setSetName }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredSets = setData
    .filter(
      (set) =>
        set.set_name.toLowerCase().includes(search.toLowerCase()) ||
        set.set.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 10);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between p-6 mt-2"
        >
          {setName || "Select set..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="PopoverContent">
        <Command>
          <CommandInput
            placeholder="Search set..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No sets found.</CommandEmpty>
            <CommandGroup>
              {filteredSets.map((set) => (
                <CommandItem
                  key={set.set}
                  value={set.set_name}
                  onSelect={() => {
                    setSetName(set.set_name); // display value
                    setCode(set.set); // hidden input value
                    setSearch(""); // clear search
                    setOpen(false);
                  }}
                >
                  {set.set_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
