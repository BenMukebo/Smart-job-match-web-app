import React from "react";
import { History, Search, ChevronRight, Clock, Info, User } from "lucide-react";
// import logo from '@/assets/logo.svg';
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";

interface Props {
  searchHistory: string[];
  activeHistoryIdx: number | null;
  onHistoryClick: (desc: string, idx: number) => void;
}

const SearchHistory: React.FC<Props> = ({
  searchHistory,
  activeHistoryIdx,
  onHistoryClick,
}) => {
  return (
    <div className="h-[calc(100vh-theme(spacing.16))] w-64 flex flex-col bg-card border-r border-border fixed md:sticky top-16 left-0 z-40 pb-16">
      {/* <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-background/90 flex items-center gap-3">
        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
          <img src={logo} alt="Logo" className="h-7 w-7" />
        </div>
        <div>
          <h2 className="font-semibold text-base">Smart Job Match</h2>
          <p className="text-xs text-muted-foreground">AI Consultant Finder</p>
        </div>
      </div> */}

      <div className="p-4 border-b border-border flex items-center gap-2">
        <History className="h-5 w-5 text-primary" />
        {/* <h3 className="font-medium">Search History</h3> */}
        <h2 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300">
          Search History
        </h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {searchHistory.length === 0 && (
            <div className="p-4 text-center space-y-4">
              <div className="mx-auto rounded-full bg-muted w-12 h-12 flex items-center justify-center">
                <Clock className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="text-sm text-muted-foreground">
                Your search history will appear here
              </div>
            </div>
          )}

          {searchHistory.map((desc, idx) => (
            <TooltipProvider key={idx} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className={`group w-full text-left rounded-md px-3 py-2 text-sm transition flex items-center gap-2 ${
                      idx === activeHistoryIdx
                        ? "bg-primary text-primary-foreground font-medium"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => onHistoryClick(desc, idx)}
                  >
                    <ChevronRight
                      className={`h-4 w-4 ${
                        idx === activeHistoryIdx
                          ? "opacity-100"
                          : "opacity-60 group-hover:opacity-100"
                      }`}
                    />
                    <span className="truncate">
                      {desc.length > 25 ? desc.slice(0, 25) + "..." : desc}
                    </span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-[300px]">
                  {desc}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-border mt-auto p-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">App version</span>
          <span>1.0.0</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
        >
          <Info className="h-4 w-4 mr-2" />
          About
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
        >
          <User className="h-4 w-4 mr-2" />
          Profile
        </Button>
      </div>
    </div>
  );
};

export default SearchHistory;
