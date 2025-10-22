"use client";
import { useState } from "react";
import { Button } from "../../ui/button"; // Corrected path based on typical structure
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

export default function NewsPost({ rssFeed }) {
  const [feed, setFeed] = useState("goldfish");
  return (
    <div className="flex flex-col flex-1 h-full">
      {" "}
      {/* flex-1 and h-full are important here */}
      <div className="flex flex-row justify-center mb-5 flex-shrink-0">
        <ButtonGroup>
          <Button
            onClick={() => setFeed("goldfish")}
            variant={feed === "goldfish" ? "default" : "outline"}
          >
            GoldFish
          </Button>
          <Button
            onClick={() => setFeed("draftsim")}
            variant={feed === "draftsim" ? "default" : "outline"}
          >
            Draftsim
          </Button>
          <Button
            onClick={() => setFeed("edhrec")}
            variant={feed === "edhrec" ? "default" : "outline"}
          >
            EDHREC
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex-1 overflow-y-auto pr-2">
        {" "}
        {/* Changed to overflow-y-auto and added pr-2 */}
        {rssFeed[feed]?.map((item) => (
          <Item key={item.link} asChild>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <ItemContent>
                <ItemTitle>{item.title}</ItemTitle>
                <ItemDescription>{item.contentSnippet}</ItemDescription>
              </ItemContent>
            </a>
          </Item>
        ))}
      </div>
    </div>
  );
}
