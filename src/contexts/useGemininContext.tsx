import { createContext, useContext, type ReactNode } from "react";
import mainSummary from "../config/gemini";

interface GeminiContextProps {
 onSend : (prompt: string) => void;
}

export const GeminiContext = createContext<GeminiContextProps | undefined>(
  undefined
);

export const useGeminiContext = () => {
  const context = useContext(GeminiContext);
  if (context === undefined) {
    throw new Error("useHeaderContext must be used within a HeaderProvider");
  }
  return context;
};

const { Provider } = GeminiContext;

const GeminiContextProvider: React.FC<{ 
  children: ReactNode 
}> = ({ children }) => {
  const onSend = async (prompt: string) => {
    await mainSummary(prompt);
  };
  // onSend("what is the meaning of life?");

  const providerValues: GeminiContextProps = {
   onSend,
  };

  return <Provider value={providerValues}>{children}</Provider>;
};

export default GeminiContextProvider;
