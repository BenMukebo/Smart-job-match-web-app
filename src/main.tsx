import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "./index.css";
import App from "./App.tsx";
import GeminiContextProvider from "./contexts/useGemininContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GeminiContextProvider>
      <App />
    </GeminiContextProvider>
  </BrowserRouter>
);
