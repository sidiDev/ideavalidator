import { Button } from "./button";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { IconLoading } from "../icons";
import { signIn, useSession } from "next-auth/react";

export default function ButtonLogin({
  children,
  icon,
  className,
}: {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  const { data: session } = useSession();
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = () => {
    setLoading(true);
    // If the user is logged in redirect him to "dashboard" page
    // Else call signIn to login using Google Auth
    if (session?.user) {
      router.push("/dashboard");
    } else {
      signIn("google", {
        redirect: true,
        callbackUrl:
          process.env.NODE_ENV == "development"
            ? "http://localhost:3000/dashboard"
            : "https://ideavalidator.org/dashboard",
      });
    }
  };

  return (
    <Button
      disabled={isLoading}
      onClick={handleLogin}
      className={`gap-2 ${className}`}
    >
      {isLoading ? <IconLoading /> : ""}
      {children}
      {isLoading ? "" : icon}
    </Button>
  );
}
