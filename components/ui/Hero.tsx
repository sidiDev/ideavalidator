"use client";

import Link from "next/link";
import { Button } from "./button";
import { signIn, useSession } from "next-auth/react";

export default function Hero() {
  const { data: session } = useSession();

  const handleLogin = () => {
    // if (process.env.NODE_ENV == "development") {
    // setIsLoading(true);
    signIn("google", {
      redirect: true,
      callbackUrl:
        process.env.NODE_ENV == "development"
          ? "http://localhost:3000"
          : "https://ideavalidator-v1.vercel.app",
    });
    // } else {
    //   router.push("https://rapidforms.co/demo", {});
    // }
  };

  return (
    <div className="h-[50rem] w-full bg-white bg-dot-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="max-w-lg mx-auto text-center space-y-6">
        <h1 className="text-5xl font-semibold leading-[1.20]">
          The #1{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]">
            Idea Validator
          </span>{" "}
          Powered By AI
        </h1>
        <p className="text-neutral-600">
          Analyze your idea, and make quick, painless, and informed judgments
          about your idea so that you know whether it's worth pursuing.
        </p>
        <div className="flex justify-center gap-3">
          <Button onClick={handleLogin}>Validate Idea</Button>
          <Button asChild variant="outline" className="bg-white shadow-sm">
            <Link href="/">Watch Demo</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
