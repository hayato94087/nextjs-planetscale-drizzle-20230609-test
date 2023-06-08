import { serial, text, mysqlTable, int } from "drizzle-orm/mysql-core";
import { InferModel, relations } from "drizzle-orm";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  authorId: int("author_id").notNull(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
}));

export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, "insert">;
export type Post = InferModel<typeof posts>;
export type NewPost = InferModel<typeof posts, "insert">;
