import { Suspense } from "react";
import AppRoutes from "./routes/AppRoutes";
import { LoadingFallback } from "@/components/LoaderFallback";

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;
