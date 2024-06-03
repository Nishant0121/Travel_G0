import { Outlet } from "react-router-dom";
import Header from "./components/header";

export default function Layout() {
  return (
    <div className="p-2 min-h-svh text-dark dark:bg-dark dark:text-light bg-light">
      <Header />
      <Outlet />
    </div>
  );
}
