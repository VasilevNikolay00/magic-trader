"use client";
import { useState } from "react";
import { Button } from "../../ui/button";
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
    <div className="flex flex-col h-full">
      <div className="flex justify-center p-4 ">
        <ButtonGroup className="rounded-xl shadow-sm overflow-hidden">
          <Button
            onClick={() => setFeed("goldfish")}
            variant={feed === "goldfish" ? "default" : "ghost"}
            size="sm"
            className="transition-all duration-200 hover:scale-105"
          >
            GoldFish
          </Button>
          <Button
            onClick={() => setFeed("draftsim")}
            variant={feed === "draftsim" ? "default" : "ghost"}
            size="sm"
            className="transition-all duration-200 hover:scale-105"
          >
            Draftsim
          </Button>
          <Button
            onClick={() => setFeed("edhrec")}
            variant={feed === "edhrec" ? "default" : "ghost"}
            size="sm"
            className="transition-all duration-200 hover:scale-105"
          >
            EDHREC
          </Button>
        </ButtonGroup>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {rssFeed[feed]?.map((item) => (
          <div
            key={item.link}
            className="bg-card/10 backdrop-blur-sm border rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:border-border"
          >
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <h3 className="text-sm font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                {item.contentSnippet}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
