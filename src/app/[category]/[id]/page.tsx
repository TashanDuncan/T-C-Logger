import { fetchItemById } from "@/app/lib/data";
import { getRatingValue } from "@/app/lib/utils";
import RatingOptions from "@/app/ui/components/rating-options";
import { Badge } from "@/app/ui/components/ui/badge";
import { Button } from "@/app/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/ui/components/ui/card";
import { Textarea } from "@/app/ui/components/ui/textarea";
import Image from "next/image";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const item = await fetchItemById(parseInt(id));
  const userItem = item?.userItems.find((item) => item.userId === 1);
  const partnerItem = item?.userItems.find((item) => item.userId === 2);
  return (
    <>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
        {item?.title}
      </h1>
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
          Created on {item?.createdAt.toDateString()} by User ID:
          {item?.createdBy}
        </span>
      </div>
      <div className="flex justify-center space-x-3 flex-wrap">
        {item?.avgRating ? (
          <Card className="w-[250px]">
            <CardHeader>
              <CardTitle>Average Rating: {item?.avgRating}</CardTitle>
              <CardDescription className="text-center">
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
          <Image src={"/tashan.jpg"} alt="user" width={150} height={150} />
          <h3 className="text-center text-3xl font-bold dark:text-white my-3">
            Your Review
          </h3>
          {/* <RatingOptions defaultValue={userItem?.rating.toString()} /> */}
          <Textarea
            className="w-full"
            placeholder="Enter your Review"
            defaultValue={userItem?.review ?? ""}
          />
          <Button className="mt-3">Update Review</Button>
        </div>
        <div className="flex flex-col w-[350px] my-6 items-center">
          <Image
            src={"/christina.png"}
            alt="partner"
            width={150}
            height={150}
          />
          <h3 className="text-center text-3xl font-bold dark:text-white my-3">
            Partner Review
          </h3>
          {/* <RatingOptions defaultValue={partnerItem?.rating.toString()}  disabled={true}/> */}
          <Textarea
            disabled
            className="w-full"
            defaultValue={partnerItem?.review ?? "Pending Review"}
          />
        </div>
      </div>
    </>
  );
}
