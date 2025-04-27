import { pgTable, text, serial, integer, boolean, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  isAdmin: true,
});

// 블로그 포스트 카테고리 열거형
export const postCategoryEnum = pgEnum('post_category', [
  'announcement', // 공지사항
  'update',       // 업데이트
  'blog',         // 블로그
  'news',         // 뉴스
  'event'         // 이벤트
]);

// 블로그 포스트 테이블
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  category: postCategoryEnum("category").notNull().default('blog'),
  featuredImage: varchar("featured_image", { length: 500 }),
  authorId: integer("author_id").references(() => users.id),
  published: boolean("published").notNull().default(false),
  isPinned: boolean("is_pinned").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// 블로그 태그 테이블
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
});

// 포스트와 태그의 다대다 관계 테이블
export const postsTags = pgTable("posts_tags", {
  postId: integer("post_id").references(() => posts.id).notNull(),
  tagId: integer("tag_id").references(() => tags.id).notNull(),
});

// 관계 정의
export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  postsTags: many(postsTags),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  postsTags: many(postsTags),
}));

export const postsTagsRelations = relations(postsTags, ({ one }) => ({
  post: one(posts, {
    fields: [postsTags.postId],
    references: [posts.id],
  }),
  tag: one(tags, {
    fields: [postsTags.tagId],
    references: [tags.id],
  }),
}));

// Insert 스키마
export const insertPostSchema = createInsertSchema(posts)
  .omit({ 
    id: true,
    createdAt: true, 
    updatedAt: true 
  })
  .partial({ 
    slug: true // slug를 선택적 필드로 만들어 자동 생성 허용
  });

export const insertTagSchema = createInsertSchema(tags)
  .omit({ 
    id: true 
  });

// 타입 내보내기
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof posts.$inferSelect;

export type InsertTag = z.infer<typeof insertTagSchema>;
export type Tag = typeof tags.$inferSelect;
