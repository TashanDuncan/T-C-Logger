"use client";

import { authenticate } from "@/app/lib/actions";
import { KeyIcon } from "lucide-react";
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
import Image from "next/image";
import { useToast } from "../ui/components/ui/use-toast";
import { ProfileProps } from "./profiles";
import { useRouter } from "next/navigation";

export default function LoginForm({
  selectedProfile,
  setSelectedProfile,
}: {
  selectedProfile: ProfileProps;
  setSelectedProfile: any;
}) {
  const { toast } = useToast();
  const { name, image, email } = selectedProfile;
  const router = useRouter();

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
    } else {
      router.push("/");
      router.refresh();
    }
  }
  const form = useForm({});
  return (
    <div className="absolute flex flex-col justify-center items-center top-[25%] w-full">
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
            <Button
              type="button"
              onClick={() => {
                setSelectedProfile(null);
              }}
            >
              Back
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
