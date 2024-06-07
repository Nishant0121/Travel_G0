import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-light dark:bg-dark text-dark dark:text-light">
      <Header />
      <div className="flex-grow p-2">
        <Outlet />
      </div>
      <Footer className="w-full" />
    </div>
  );
}
