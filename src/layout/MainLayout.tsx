import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";

const MainLayout = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-indigo-950 dark:via-gray-950 dark:to-violet-950 text-foreground">
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;
