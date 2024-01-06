"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";
import { ArrowRightIcon, KeyIcon } from "lucide-react";
import { Button } from "../ui/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/components/ui/form";
import { Input } from "../ui/components/ui/input";
import BackButton from "../ui/buttons/back";
import Image from "next/image";
import { useToast } from "../ui/components/ui/use-toast";
import { ProfileProps } from "./profiles";

export default function LoginForm({
  selectedProfile,
}: {
  selectedProfile: ProfileProps;
}) {
  const { toast } = useToast();
  const { name, image, email } = selectedProfile;

  async function onSubmit(values: any) {
    const authFailures = await authenticate({
      email,
      ...values,
    });
    if (authFailures) {
      toast({
        title: authFailures,
        description: "Please try again.",
      });
    }
  }
  const form = useForm({});
  return (
    <div className="my-24">
      <div className="flex justify-center items-center flex-col">
        <Image
          src={image || ""}
          alt={name}
          width={200}
          height={200}
          className="h-[200px] w-[200px]"
        />
        <span className=" text-lg font-bold my-3">{name}</span>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex text-center items-center space-y-3 flex-col"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter password..."
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex mt-3">
            <Button type="submit" className="mr-3">
              <KeyIcon />
              Log In
            </Button>
            <BackButton />
          </div>
        </form>
      </Form>
    </div>
  );
}
