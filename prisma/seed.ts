import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  //create 2 users
  const tashan = await prisma.user.upsert({
    where: { email: "tashan@test.com" },
    update: {},
    create: {
      id: 1,
      email: "tashan@test.com",
      name: "Tashan",
      password: "password",
    },
  });
  const christina = await prisma.user.upsert({
    where: { email: "christina@test.com" },
    update: {},
    create: {
      id: 2,
      email: "christina@test.com",
      name: "Christina",
      password: "password2",
    },
  });
  // make both users partners

  await prisma.user.update({
    where: { id: 1 },
    data: {
      partnerId: 2,
    },
  });
  await prisma.user.update({
    where: { id: 2 },
    data: {
      partnerId: 1,
    },
  });

  // create item categories

  const tvShows = await prisma.itemCategory.create({
    data: {
      slug: "tv-shows",
      description: "TV Shows",
    },
  });
  const movies = await prisma.itemCategory.create({
    data: {
      slug: "movies",
      description: "Movies",
    },
  });
  const books = await prisma.itemCategory.create({
    data: {
      slug: "books",
      description: "Books",
    },
  });
  const music = await prisma.itemCategory.create({
    data: {
      slug: "music",
      description: "Music",
    },
  });
  const games = await prisma.itemCategory.create({
    data: {
      slug: "games",
      description: "Games",
    },
  });
  const places = await prisma.itemCategory.create({
    data: {
      slug: "places",
      description: "Places",
    },
  });
  const restaurants = await prisma.itemCategory.create({
    data: {
      slug: "restaurants",
      description: "Restaurants",
    },
  });

  const activities = await prisma.itemCategory.create({
    data: {
      slug: "activities",
      description: "Activities",
    },
  });

  // create items
  const item1 = await prisma.item.create({
    data: {
      categoryId: 1,
      title: "The Office",
      description: "A show about nothing",
      createdBy: 1,
      tags: {
        create: [
          {
            name: "Comedy",
          },
        ],
      },
      // link: 'https://www.netflix.com/title/70136120',
    },
  });
  const item2 = await prisma.item.create({
    data: {
      categoryId: 1,
      title: "Parks and Recreation",
      description: "A show about nothing",
      createdBy: 1,
    },
  });
  const item3 = await prisma.item.create({
    data: {
      categoryId: 5,
      title: "GTA",
      description: "A Game",
      createdBy: 2,
      tags: {
        create: [
          {
            name: "Action",
          },
        ],
      },
    },
  });
  const item4 = await prisma.item.create({
    data: {
      categoryId: 5,
      title: "Final Fantasy",
      description: "A Game",
      createdBy: 2,
      tags: {
        create: [
          {
            name: "Adventure",
          },
          {
            name: "RPG",
          },
        ],
      },
    },
  });

  //create user_items
  const user_item1 = await prisma.userItem.create({
    data: {
      userId: 1,
      itemId: 1,
      rating: 5,
      experienced: true,
    },
  });
  const user_item2 = await prisma.userItem.create({
    data: {
      userId: 1,
      itemId: 2,
      rating: 8,
      experienced: true,
    },
  });
  const user_item3 = await prisma.userItem.create({
    data: {
      userId: 2,
      itemId: 3,
      rating: 5,
      experienced: true,
    },
  });
  const user_item4 = await prisma.userItem.create({
    data: {
      userId: 2,
      itemId: 4,
      rating: 8,
      experienced: true,
    },
  });

  const user_item5 = await prisma.userItem.create({
    data: {
      userId: 1,
      itemId: 4,
      rating: 10,
      experienced: true,
    },
  });

  console.log({
    users: { tashan, christina },
    item_categories: {
      tvShows,
      movies,
      books,
      music,
      games,
      places,
      restaurants,
      activities,
    },
    items: { item1, item2, item3, item4 },
    user_items: {
      user_item1,
      user_item2,
      user_item3,
      user_item4,
      user_item5,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
