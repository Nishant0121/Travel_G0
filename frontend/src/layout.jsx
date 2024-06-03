import { Outlet } from "react-router-dom";
import Header from "./components/header";

export default function Layout() {
  return (
    <div className="p-2 min-h-svh dark:bg-primary-dark dark:text-t-dark bg-primary-light">
      <Header />
      <Outlet />
    </div>
  );
}
