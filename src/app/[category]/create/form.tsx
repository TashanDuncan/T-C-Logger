"use client";

import { createItem } from "@/app/lib/actions";
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
import { ItemCategory } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { CreateItemSchema } from "@/app/lib/utils";

async function onSubmit(values: z.infer<typeof CreateItemSchema>) {
  console.log(values);
  await createItem(values);
}
export default function CreateItemForm({
  categories,
}: {
  categories: ItemCategory[];
}) {
  const currentCategory = usePathname().split("/")[1];
  const form = useForm<z.infer<typeof CreateItemSchema>>({
    resolver: zodResolver(CreateItemSchema),
    defaultValues: {
      category: currentCategory,
      experienced: false,
    },
  });

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
                <RatingOptions {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="experienced"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md  py-4">
              <FormLabel>Experienced</FormLabel>
              <FormControl>
                <Checkbox
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
