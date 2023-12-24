const tags = [
  {
    id: "1",
    name: "anime",
  },
  {
    id: "2",
    name: "romance",
  },
  {
    id: "3",
    name: "fighting",
  },
];

const users = [
  {
    id: "1",
    name: "Tashan",
    email: "tashan@example",
    partner_id: "2",
    password: "password",
  },
  {
    id: "2",
    name: "Christina",
    email: "christina@example",
    partner_id: "1",
    password: "anotherPassword",
  },
];
const itemTypes = [
  {
    id: "1",
    name: "tv-shows",
    description: "TV shows",
  },
  {
    id: "2",
    name: "movies",
    description: "Movies",
  },
  {
    id: "3",
    name: "games",
    description: "Games",
  },
  {
    id: "4",
    name: "restaurants",
    description: "Restaurants",
  },
];

const items = [
  {
    id: "1",
    title: "Item 1",
    description: "This is item 1",
    type_id: "1",
    tags: ["tag1", "tag2", "tag3"],
    created_by: "1",
    created_at: "2021-01-01",
  },
  {
    id: "2",
    title: "Item 2",
    description: "This is item 2",
    type_id: "2",
    tags: ["tag1", "tag2", "tag3"],
    created_by: "2",
    created_at: "2021-01-01",
  },
  {
    id: "3",
    title: "Item 3",
    description: "This is item 3",
    type_id: "3",
    tags: ["tag1", "tag2", "tag3"],
    created_by: "1",
    created_at: "2021-01-01",
  },
  {
    id: "4",
    title: "Item 4",
    description: "This is item 4",
    type_id: "4",
    tags: ["tag1", "tag2", "tag3"],
    created_by: "2",
    created_at: "2021-01-01",
  },
];

const userItems = [
  {
    id: "1",
    user_id: "1",
    item_id: "1",
    rating: "9",
    review: "This is a review",
    created_at: "2021-01-01",
  },
  {
    id: "2",
    user_id: "2",
    item_id: "2",
    rating: "2",
    review: "This is a review",
    created_at: "2021-01-01",
  },
  {
    id: "3",
    user_id: "1",
    item_id: "3",
    rating: "8",
    review: "This is a review",
    created_at: "2021-01-01",
  },
  {
    id: "4",
    user_id: "2",
    item_id: "4",
    rating: "7",
    review: "This is a review",
    created_at: "2021-01-01",
  },
];

module.exports = {
  users,
  itemTypes,
  items,
  userItems,
  tags,
};
