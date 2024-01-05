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
        <Button variant="outline" className="hover:text-blue-600 mx-2">
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
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={deleteItemWithId}>
            <AlertDialogAction type="submit">Continue</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
