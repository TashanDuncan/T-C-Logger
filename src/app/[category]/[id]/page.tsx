import { fetchItemById, fetchUser } from "@/app/lib/data";
import { getRatingValue } from "@/app/lib/utils";
import { Badge } from "@/app/ui/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/ui/components/ui/card";

import Image from "next/image";
import UserReview from "./user-review";
import { Separator } from "@/app/ui/components/ui/separator";
import { Checkbox } from "@/app/ui/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
} from "@/app/ui/components/ui/select";
import { getCurrentUser } from "@/app/lib/session";
import BackArrow from "@/app/ui/buttons/back-arrow";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const item = await fetchItemById(parseInt(id));
  const user = await getCurrentUser();
  const partner = await fetchUser(user?.partnerId || "");
  const creator = await fetchUser(item?.createdBy || "");
  const userItem = item?.userItems.find((item) => item.userId === user?.id);
  const partnerItem = item?.userItems.find(
    (item) => item.userId === user?.partnerId
  );

  return (
    <>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
        {item?.title}
      </h1>
      <BackArrow className="fixed top-0 left-0 mt-4 ml-4 md:hidden" />
      <div className="flex my-3 justify-center">
        {item?.tags.map((tag) => (
          <Badge key={tag.id} className="mx-2">
            {tag.name}
          </Badge>
        ))}
      </div>
      <div className="flex justify-center flex-col">
        <h2 className="text-center mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          {item?.description}
        </h2>
        <span className="mb-4 text-sm  text-center font-normal text-gray-500 dark:text-gray-400">
          Created on {item?.createdAt.toDateString()} by{" "}
          {creator?.name || "unknown"}
        </span>
      </div>
      <div className="flex justify-center space-x-3 flex-wrap">
        {item?.avgRating ? (
          <Card className="w-[250px]">
            <CardHeader>
              <CardTitle>Average Rating: {item?.avgRating}</CardTitle>
              <CardDescription className="text-center">
                Overall you both think {item.title} is{" "}
                {`${getRatingValue(item?.avgRating).replace(/\(\d+\)\s/, "")}!`}
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <></>
        )}
      </div>

      <div className="flex justify-around flex-wrap">
        <div className="flex flex-col w-[350px] my-6 items-center">
          <Image
            src={user?.image || ""}
            alt={user?.name || "user"}
            width={200}
            height={200}
            className="w-[200px] h-[200px]"
          />
          <h3 className="text-center text-3xl font-bold dark:text-white my-3">
            Your Review
          </h3>
          <UserReview
            userItem={userItem}
            userId={user?.id || ""}
            itemId={item?.id || 0}
          />
        </div>
        <Separator className="md:hidden my-4" />
        <div className="flex flex-col w-[350px] my-6 items-center">
          <Image
            src={partner?.image || ""}
            alt={partner?.name || "partner"}
            width={200}
            height={200}
            className="w-[200px] h-[200px]"
          />
          <h3 className="text-center text-3xl font-bold dark:text-white my-3">
            {`${partner?.name}'s` || "Partner"} Review
          </h3>
          <div className="flex flex-col items-center space-x-3 space-y-3 rounded-md  py-4 justify-center">
            <span className="text-sm font-bold dark:text-white">
              {partnerItem?.experienced
                ? `${partner?.name || "Partner"} has experienced ${item?.title}`
                : `${partner?.name || "Partner"} has not been experienced ${
                    item?.title
                  } yet!`}
            </span>
            {partnerItem?.experienced && (
              <Checkbox
                className="w-6 h-6"
                checked={partnerItem.experienced}
                disabled={true}
              />
            )}
          </div>
          <div>
            <span className="text-sm font-bold dark:text-white">Rating</span>
            <Select disabled={true}>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder={getRatingValue(partnerItem?.rating || 0)}
                />
              </SelectTrigger>
            </Select>
          </div>
          <div className="flex flex-col  space-x-3 space-y-3 rounded-md  py-4  w-full">
            <span className="text-sm font-bold dark:text-white ">Review</span>
            <p className="mb-3 dark:text-gray-400">
              {partnerItem?.review ?? "Pending Review"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
