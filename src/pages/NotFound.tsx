import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-center">
      <h1 className="text-6xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">404</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Button
        onClick={() => navigate("/")}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md"
      >
        Go Back Home
      </Button>
    </div>
  );
}
