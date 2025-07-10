import { Outlet } from "react-router";
import Navbar from "../components/ui/navbar";
import { Toaster } from "sonner";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Toaster richColors />
    </>
  );
}
