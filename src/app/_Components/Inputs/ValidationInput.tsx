"use client";
// this amazing code but i don't understood 😅
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/app/_Components/ui/form";
import { Input } from "@/app/_Components/ui/input";
import { InputHTMLAttributes } from "react";

type Props<T> = {
  fieldTitle: string;
  nameInSchema: keyof T & string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function ValidationInput<T>({
  fieldTitle,
  nameInSchema,
  className,
  ...props
}: Props<T>) {
  const form = useFormContext();

  return (
    <FormField
      name={nameInSchema}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>
          <FormControl>
            <Input
              id={nameInSchema}
              className={`w-full max-w-xs disabled:text-blue-500 dark:disabled:text-yellow-300 disabled:opacity-75
                ${className}
                    `}
              {...props}
              {...field}

            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
}
