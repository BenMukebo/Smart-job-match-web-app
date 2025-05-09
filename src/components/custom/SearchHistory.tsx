import React, { useState } from "react";
import {
  History,
  ChevronRight,
  Clock,
  Info,
  User,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  Trash2,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  searchHistory: string[];
  activeHistoryIdx: number | null;
  onHistoryClick: (desc: string, idx: number) => void;
  onHistoryDelete: (idx: number) => void;
  onHistoryClear: () => void;
}

const SearchHistory: React.FC<Props> = ({
  searchHistory,
  activeHistoryIdx,
  onHistoryClick,
  onHistoryDelete,
  onHistoryClear,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  // For mobile view
  const MobileSearchHistory = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden fixed bottom-4 left-4 z-50 rounded-full shadow-lg bg-indigo-600 hover:bg-indigo-700 text-white border-none"
        >
          <History className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <HistoryContent />
      </SheetContent>
    </Sheet>
  );

  // Content of the history sidebar/sheet
  const HistoryContent = () => (
    <>
      <div className="p-4 pt-8 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          <h2 className="text-base font-semibold text-indigo-800 dark:text-indigo-300">
            Search History
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              {searchHistory.length > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear Search History</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to clear your entire search history? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={onHistoryClear}
                >
                  Clear All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="md:flex hidden"
          >
            {isOpen ? (
              <PanelLeftClose className="h-4 w-4" />
            ) : (
              <PanelLeftOpen className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 h-[calc(100vh-theme(spacing.32))]">
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
            <div key={idx} className="group relative">
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className={`w-full text-left rounded-md px-3 py-2 text-sm transition flex items-center gap-2 pr-8 ${
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
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onHistoryDelete(idx);
                }}
                className={`absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity ${
                  idx === activeHistoryIdx ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
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
    </>
  );

  // Collapsed state toggle button
  const CollapsedToggle = () => (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsOpen(true)}
      className="fixed top-20 left-2 z-50 md:flex hidden bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/50 rounded-full shadow-md"
    >
      <PanelLeftOpen className="h-5 w-5 text-indigo-700 dark:text-indigo-300" />
    </Button>
  );

  return (
    <>
      {/* Mobile view */}
      <MobileSearchHistory />

      {/* Desktop view */}
      <div
        className={cn(
          "h-[calc(100vh-theme(spacing.16))] bg-card border-r border-border sticky top-16 left-0 z-40 transition-all duration-300 ease-in-out overflow-hidden md:flex flex-col hidden",
          isOpen ? "w-64" : "w-0"
        )}
      >
        {isOpen ? <HistoryContent /> : null}
      </div>

      {/* Show toggle when collapsed */}
      {!isOpen && <CollapsedToggle />}
    </>
  );
};

export default SearchHistory;
