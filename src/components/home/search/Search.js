"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SetSelector from "./searchComponents/SetSelector";
import RaritySelector from "./searchComponents/RaritySelector";
import TypeSelector from "./searchComponents/TypeSelector";
import SuperTypeSelector from "./searchComponents/SuperTypeSelector";
import SubTypeSelector from "./searchComponents/SubTypeSelector";
import ManaCostSelector from "./searchComponents/ManaCostSelector";
import PowerSelector from "./searchComponents/PowerSelector";
import TougnessSelector from "./searchComponents/ToughnessSelector copy";
import LoyaltySelector from "./searchComponents/LoyaltySelector";
import ManaColorSelector from "./searchComponents/ManaColorSelector";
import KeyWordsSelector from "./searchComponents/KeyWordsSelector";
import NameInput from "./searchComponents/NameInput";

export default function Search() {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission to handle navigation manually
    const formData = new FormData(e.target);
    const searchParams = new URLSearchParams();
    // Iterate over formData entries and append them to URLSearchParams
    for (let [key, value] of formData.entries()) {
      if (value) {
        searchParams.append(key, value);
      }
    }

    // Construct the URL with parameters
    const queryString = searchParams.toString();
    window.location.href = `/cards${queryString ? `?${queryString}` : ""}`;
  };

  return (
    <div className="m-5 w-2/3 flex-1 h-full">
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle>Card Search</CardTitle>
          <CardDescription>
            Search for MTG Cards throughout our local PSQL Database
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 m-4 h-full"
          >
            <NameInput />
            <Button type="submit">Submit</Button>

            <div className="flex-1 overflow-hidden border p-2 rounded-xl mb-4">
              <div className="flex flex-col gap-4 overflow-y-auto h-full pr-2">
                <SetSelector />
                <RaritySelector />
                <TypeSelector />
                <SuperTypeSelector />
                <SubTypeSelector />
                <KeyWordsSelector />
                <div className="flex flex-row gap-4">
                  <div className="border w-full rounded-md p-4 space-y-3">
                    <ManaColorSelector />
                    <ManaCostSelector />
                    <PowerSelector />
                    <TougnessSelector />
                    <LoyaltySelector />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
