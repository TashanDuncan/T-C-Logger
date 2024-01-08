"use client";
import RatingOptions from "@/app/ui/components/rating-options";
import { Button } from "@/app/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/ui/components/ui/form";
import { Textarea } from "@/app/ui/components/ui/textarea";
import { UserItem } from "@prisma/client";
import { useForm } from "react-hook-form";
import { UserItemSchema } from "@/app/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Checkbox } from "@/app/ui/components/ui/checkbox";
import { createOrUpdateUserItem } from "@/app/lib/actions";
import BackButton from "@/app/ui/buttons/back";
import { useToast } from "@/app/ui/components/ui/use-toast";
import { use, useEffect } from "react";

async function onSubmit(values: z.infer<typeof UserItemSchema>) {
  console.log(values);
  await createOrUpdateUserItem(values);
}

export default function UserReview({
  userItem,
  userId,
  itemId,
}: {
  userItem: UserItem | undefined;
  userId: string;
  itemId: number;
}) {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof UserItemSchema>>({
    resolver: zodResolver(UserItemSchema),
    defaultValues: {
      id: itemId,
      userId: userId,
      rating: userItem?.rating,
      review: userItem?.review ?? undefined,
      experienced: !!userItem?.experienced,
    },
  });
  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      toast({
        title: "Review Submitted",
        description: "Your review has been submitted.",
      });
    }
  }, [form.formState.submitCount, form.formState.isSubmitSuccessful, toast]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="experienced"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center space-x-3 space-y-3 rounded-md  py-4 justify-center">
              <FormLabel>Experienced</FormLabel>
              <FormControl>
                <Checkbox
                  className="w-6 h-6"
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating*</FormLabel>
              <FormControl>
                <RatingOptions
                  defaultValue={field.value?.toString() ?? "0"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Review*</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter your Review" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-3">
          <Button
            className="mr-3"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Update"}
          </Button>
          <BackButton className="hidden md:inline-block" />
        </div>
      </form>
    </Form>
  );
}
