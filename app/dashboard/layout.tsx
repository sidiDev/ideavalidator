import DashboardNavbar from "@/components/ui/Navbar/DashboardNavbar";
import { ReactNode } from "react";

export const metadata = {
  title: "Dashboard",
};

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <main>
      <DashboardNavbar />
      <div className="mt-20 max-w-screen-md mx-auto px-4">{children}</div>
    </main>
  );
}
