import React from "react";
import { Spinner } from "@/components/ui/spinner";

export const LoadingFallback: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-center">
      <Spinner className="w-16 h-16 text-indigo-600 dark:text-indigo-400 mb-4" />
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Please wait while we load the application...
      </p>
    </div>
  );
};
