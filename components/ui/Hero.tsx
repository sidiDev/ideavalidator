"use client";

import Link from "next/link";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Hero() {
  return (
    <div className="h-[50rem] w-full bg-white bg-dot-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="max-w-lg mx-auto text-center space-y-6 px-4 sm:px-0">
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
          <Button>
            <Link href="/dashboard">Validate Idea</Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="bg-white shadow-sm">
                Watch Demo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <iframe
                className="w-full h-56 mt-5 rounded-xl border sm:h-96"
                src="https://www.youtube.com/embed/Fc5Gt4ORFZQ"
              ></iframe>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
