// npm node -r esbuild-register src/db/examplePlanetScaleDriver.ts

import { NewPost, NewUser, posts, users } from "./schema";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

import "dotenv/config";

async function main() {
  const connection = await mysql.createConnection({
    uri: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: true,
    },
  });

  const db = drizzle(connection, { schema });

  // DELETE FROM users;
  const deleteAllUsers = await db.delete(users);
  console.log("delete all users\n");
  console.log(deleteAllUsers);
  console.log("\n-----------------------------------\n");

  // INSERT INTO user (name) VALUES ('john');
  const newUsers: NewUser[] = [
    {
      name: "john",
    },
    {
      name: "andrew",
    },
  ];
  const insertUsers = await db.insert(users).values(newUsers);
  console.log("add users\n");
  console.log(insertUsers);
  console.log("\n-----------------------------------\n");

  // SELECT * FROM users;
  const selecAllUsers = await db.select().from(users);
  console.log("list all users\n");
  console.log(selecAllUsers);
  console.log("\n-----------------------------------\n");

  // DELETE FROM posts;
  const deleteAllPosts = await db.delete(posts);
  console.log("delete all posts\n");
  console.log(deleteAllPosts);
  console.log("\n-----------------------------------\n");

  // INSERT INTO user (name) VALUES ('john');
  const newPosts: NewPost[] = [
    {
      content: "john",
      authorId: selecAllUsers[0].id,
    },
    {
      content: "andrew",
      authorId: selecAllUsers[1].id,
    },
  ];
  const inserPosts = await db.insert(posts).values(newPosts);
  console.log("add posts\n");
  console.log(inserPosts);
  console.log("\n-----------------------------------\n");

  // SELECT * FROM posts;
  const selecAllPosts = await db.select().from(posts);
  console.log("lists all posts\n");
  console.log(selecAllPosts);
  console.log("\n-----------------------------------\n");

  const result = await db.query.users.findMany({
    with: {
      posts: true,
    },
  });
  console.log("lists all users with related posts\n");
  result.map((user) => {
    console.log("user.id: " + user.id);
    console.log("user.name: " + user.name);
    user.posts.map((post) => {
      console.log("- post.id: " + post.id);
      console.log("- post.authorId: " + post.authorId);
      console.log("- post.content: " + post.content);
    });
    console.log("\n");
  });
  console.log("\n-----------------------------------\n");

  connection.end();
}

main();
