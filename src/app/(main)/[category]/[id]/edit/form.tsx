"use client";

import { updateItem } from "@/app/lib/actions";
import { z } from "zod";
import RatingOptions from "@/app/ui/components/rating-options";
import { Button } from "@/app/ui/components/ui/button";
import { Checkbox } from "@/app/ui/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/ui/components/ui/form";
import { Input } from "@/app/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/ui/components/ui/select";
import { Textarea } from "@/app/ui/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ItemCategory, UserItem } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { ItemSchemaWithId } from "@/app/lib/utils";
import BackButton from "@/app/ui/buttons/back";
import { useEffect } from "react";
import { ItemWithAvgRating } from "@/app/lib/data";
import { useToast } from "@/app/ui/components/ui/use-toast";

async function onSubmit(values: z.infer<typeof ItemSchemaWithId>) {
  console.log(values);
  await updateItem(values);
}
export default function EditItemForm({
  categories,
  userId,
  item,
  userItem,
}: {
  categories: ItemCategory[];
  userId: string;
  item: ItemWithAvgRating;
  userItem?: UserItem;
}) {
  const { toast } = useToast();

  const currentCategory = usePathname().split("/")[1];
  const form = useForm<z.infer<typeof ItemSchemaWithId>>({
    resolver: zodResolver(ItemSchemaWithId),
    defaultValues: {
      id: item.id,
      userId,
      title: item.title,
      description: item.description ?? "",
      rating: userItem?.rating ?? 0,
      review: userItem?.review ?? "",
      category: currentCategory,
      experienced: userItem?.experienced,
    },
  });

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      toast({
        title: "Item Updated",
        description: "Your item has been updated.",
      });
    }
  }, [form.formState.submitCount, form.formState.isSubmitSuccessful, toast]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title*</FormLabel>
              <FormControl>
                <Input placeholder="Enter Name of Item..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter Description of Item..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormControl>
              <Input placeholder="Enter Tags of Item..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
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
          name="experienced"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md  py-4">
              <FormLabel>Experienced</FormLabel>
              <FormControl>
                <Checkbox
                  className="w-6 h-6"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category*</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} {...field}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.slug}>
                          {category.description}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter review of Item..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button
            className="mr-3"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>{" "}
          <BackButton />
        </div>
      </form>
    </Form>
  );
}
