"use client";
import FormValidate from "@/components/ui/FormValidate";
import { FormEvent, useState } from "react";

export default function Dashboard() {
  const [ideaDescription, setIdeaDescription] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(ideaDescription);
  }

  return (
    <>
      <FormValidate
        submit={handleSubmit}
        value={ideaDescription}
        isLoading={isLoading}
        onInput={(e) => setIdeaDescription(e.target.value)}
      />
    </>
  );
}
