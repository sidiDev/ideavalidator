import { ChangeEventHandler, FormEventHandler } from "react";
import { Button } from "./button";
import { IconLoading } from "../icons";

export default function FormValidate({
  submit,
  onInput,
  value,
  isLoading,
}: {
  submit?: FormEventHandler<HTMLFormElement>;
  onInput?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  isLoading?: boolean;
}) {
  return (
    <div className="max-w-lg mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Validate. Refine. Build.</h1>
        <p className="mt-3 text-neutral-600">
          Describe your project idea, and let us validate it for you.
        </p>
      </div>
      <form onSubmit={submit} className="mt-8">
        <div className="flex items-center rounded-xl border py-1 px-2 ring-neutral-300 peer-invalid:border-red-500 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <input
            required
            value={value}
            className="flex-1 py-1 outline-none bg-transparent text-sm text-neutral-600 mr-2 peer"
            placeholder="A website builder for busy founders"
            onChange={onInput}
            minLength={15}
          />
          <Button
            disabled={isLoading}
            size="sm"
            className="rounded-xl px-3 shadow w-20"
          >
            {isLoading ? <IconLoading /> : "Validate"}
          </Button>
        </div>
      </form>
    </div>
  );
}
