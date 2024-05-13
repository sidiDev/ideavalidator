import { ReactNode } from "react";

export const metadata = {
  title: "Your Ideas",
};

export default async function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
