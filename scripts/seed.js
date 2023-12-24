const { db } = require("@vercel/postgres");
const {
  items,
  itemTypes,
  users,
  userItems,
  tags,
} = require("../src/app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedTags(client) {
  try {
    // Create the "tags" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS tags (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
      );
    `;

    console.log(`Created "tags" table`);

    // Insert data into the "tags" table
    const insertedTags = await Promise.all(
      tags.map(
        (tag) => client.sql`
        INSERT INTO tags (id, name)
        VALUES (${tag.id}, ${tag.name})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedTags.length} tags`);

    return {
      createTable,
      tags: insertedTags,
    };
  } catch (error) {
    console.error("Error seeding tags:", error);
    throw error;
  }
}

async function seedUsers(client) {
  try {
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        partner_id INT DEFAULT NULL,
        password TEXT NOT NULL,
        FOREIGN KEY (partner_id) REFERENCES users(id)
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email},${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      })
    );

    // const insertedUsers = await Promise.all(
    //   users.map(async (user) => {
    //     if (user.partner_id) {
    //       return client.sql`
    //       UPDATE users
    //       SET partner_id = ${user.partner_id}
    //       WHERE id = ${user.id};
    //     `;
    //     }
    //   })
    // );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function seedItemTypes(client) {
  try {
    // Create the "item_types" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS item_types (
        id INT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT
      );
    `;

    console.log(`Created "item_types" table`);

    // Insert data into the "item_types" table
    const insertedItemTypes = await Promise.all(
      itemTypes.map(
        (itemType) => client.sql`
        INSERT INTO item_types (id, name, description)
        VALUES (${itemType.id}, ${itemType.name}, ${itemType.description})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedItemTypes.length} item types`);

    return {
      createTable,
      itemTypes: insertedItemTypes,
    };
  } catch (error) {
    console.error("Error seeding item types:", error);
    throw error;
  }
}

async function seedItems(client) {
  try {
    // Create the "items" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS items (
    id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type_id INT NOT NULL,
    tags tags[],
    created_by INT NOT NULL,
    created_at DATE NOT NULL,
    FOREIGN KEY (type_id) REFERENCES item_types(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
  );
`;

    console.log(`Created "items" table`);

    // Insert data into the "items" table
    const insertedItems = await Promise.all(
      items.map(
        (item) => client.sql`
        INSERT INTO items (id, title, description, type_id, tags, created_by, created_at)
        VALUES (${item.id}, ${item.title}, ${item.description}, ${item.type_id}, ${item.tags}, ${item.created_by}, ${item.created_at})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedItems.length} items`);

    return {
      createTable,
      invoices: insertedItems,
    };
  } catch (error) {
    console.error("Error seeding items:", error);
    throw error;
  }
}

async function seedUserItems(client) {
  try {
    // Create the "user_items" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS user_items (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    item_id INT NOT NULL,
    rating INT NOT NULL,
    review TEXT,
    created_at DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
  );
`;

    console.log(`Created "user_items" table`);

    // Insert data into the "user_items" table
    const insertedUserItems = await Promise.all(
      userItems.map(
        (userItem) => client.sql`
        INSERT INTO user_items (id, user_id, item_id, rating, review, created_at)
        VALUES (${userItem.id}, ${userItem.user_id}, ${userItem.item_id}, ${userItem.rating}, ${userItem.review}, ${userItem.created_at})
        ON CONFLICT (id) DO NOTHING;
      `
      )
    );

    console.log(`Seeded ${insertedUserItems.length} user items`);

    return {
      createTable,
      invoices: insertedUserItems,
    };
  } catch (error) {
    console.error("Error seeding user items:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedItemTypes(client);
  await seedItems(client);
  await seedUserItems(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
