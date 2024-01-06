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

export default function LoginForm({
  selectedProfile,
}: {
  selectedProfile: string;
}) {
  const { toast } = useToast();

  async function onSubmit(values: any) {
    const authFailures = await authenticate({
      email: selectedProfile,
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
    <div className=" my-32">
      <div className="flex justify-center">
        <Image
          src={selectedProfile}
          alt={selectedProfile}
          width={200}
          height={200}
          className="h-[200px] w-[200px]"
        />
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
            <Button
              type="submit"
              className="mr-3"
              onClick={() => {
                toast({
                  title: "auth",
                  description: "Please try again.",
                });
              }}
            >
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

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
