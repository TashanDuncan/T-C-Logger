import { Button } from "@/app/ui/components/ui/button";

import { Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { ItemWithAvgRating } from "../../lib/data";
import { deleteItem } from "../../lib/actions";

export function DeleteItem({ item }: { item: ItemWithAvgRating }) {
  const deleteItemWithId = deleteItem.bind(null, item.id);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="outline" className="hover:text-blue-600">
          <Trash2Icon className="shrink-0 w-4 h-4 md:w-5 md:h-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to delete {item.title}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            {item.title} and remove you and your partners review from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form action={deleteItemWithId}>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
