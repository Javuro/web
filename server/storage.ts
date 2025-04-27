import { users, posts, tags, postsTags, type User, type InsertUser, type Post, type InsertPost, type Tag, type InsertTag } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, inArray, sql, like } from "drizzle-orm";
import { slugify } from "@shared/utils";

// 확장된 인터페이스
export interface IStorage {
  // 사용자 관련
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // 블로그 포스트 관련
  getPosts(options?: {
    limit?: number; 
    offset?: number;
    category?: string;
    published?: boolean;
    search?: string;
  }): Promise<Post[]>;
  
  getPostBySlug(slug: string): Promise<Post | undefined>;
  getPostById(id: number): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post | undefined>;
  deletePost(id: number): Promise<boolean>;
  
  // 태그 관련
  getTags(): Promise<Tag[]>;
  getTagBySlug(slug: string): Promise<Tag | undefined>;
  createTag(tag: InsertTag): Promise<Tag>;
  
  // 포스트-태그 관계
  addTagToPost(postId: number, tagId: number): Promise<void>;
  removeTagFromPost(postId: number, tagId: number): Promise<void>;
  getPostTags(postId: number): Promise<Tag[]>;
  getPostsByTagSlug(tagSlug: string): Promise<Post[]>;
}

// 데이터베이스 기반 스토리지로 변경
export class DatabaseStorage implements IStorage {
  // 사용자 관련 메서드
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // 블로그 포스트 관련 메서드
  async getPosts(options: {
    limit?: number; 
    offset?: number;
    category?: string;
    published?: boolean;
    search?: string;
  } = {}): Promise<Post[]> {
    let query = db.select().from(posts);
    
    // 필터 조건 적용
    const conditions = [];
    
    if (options.category) {
      conditions.push(eq(posts.category, options.category));
    }
    
    if (options.published !== undefined) {
      conditions.push(eq(posts.published, options.published));
    }
    
    if (options.search) {
      conditions.push(
        sql`(${posts.title} ILIKE ${'%' + options.search + '%'} OR ${posts.content} ILIKE ${'%' + options.search + '%'})`
      );
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    // 정렬 및 페이지네이션
    query = query.orderBy(desc(posts.createdAt));
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    if (options.offset) {
      query = query.offset(options.offset);
    }
    
    return await query;
  }
  
  async getPostBySlug(slug: string): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post;
  }
  
  async getPostById(id: number): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post;
  }
  
  async createPost(insertPost: InsertPost): Promise<Post> {
    // 제목으로 슬러그 생성
    const slug = slugify(insertPost.title);
    
    // 슬러그 중복 체크 및 고유 슬러그 생성
    let finalSlug = slug;
    let counter = 1;
    let slugExists = await this.getPostBySlug(finalSlug);
    
    while (slugExists) {
      finalSlug = `${slug}-${counter}`;
      counter++;
      slugExists = await this.getPostBySlug(finalSlug);
    }
    
    // 현재 시간 추가
    const now = new Date();
    
    const [post] = await db
      .insert(posts)
      .values({
        ...insertPost,
        slug: finalSlug,
        createdAt: now,
        updatedAt: now
      })
      .returning();
    
    return post;
  }
  
  async updatePost(id: number, postUpdate: Partial<InsertPost>): Promise<Post | undefined> {
    // 슬러그 변경 처리
    if (postUpdate.title) {
      const slug = slugify(postUpdate.title);
      let finalSlug = slug;
      let counter = 1;
      
      // 다른 포스트와 슬러그 충돌 확인
      let slugExists = await db.select()
        .from(posts)
        .where(and(
          eq(posts.slug, finalSlug),
          sql`${posts.id} != ${id}`
        ));
      
      while (slugExists.length > 0) {
        finalSlug = `${slug}-${counter}`;
        counter++;
        slugExists = await db.select()
          .from(posts)
          .where(and(
            eq(posts.slug, finalSlug),
            sql`${posts.id} != ${id}`
          ));
      }
      
      postUpdate = { ...postUpdate, slug: finalSlug };
    }
    
    // 수정 시간 업데이트
    const postUpdateWithTime = { 
      ...postUpdate, 
      updatedAt: new Date() 
    };
    
    const [updatedPost] = await db
      .update(posts)
      .set(postUpdateWithTime)
      .where(eq(posts.id, id))
      .returning();
    
    return updatedPost;
  }
  
  async deletePost(id: number): Promise<boolean> {
    // 먼저 관련 태그 연결 삭제
    await db
      .delete(postsTags)
      .where(eq(postsTags.postId, id));
    
    // 포스트 삭제
    const result = await db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning({ id: posts.id });
    
    return result.length > 0;
  }
  
  // 태그 관련 메서드
  async getTags(): Promise<Tag[]> {
    return await db.select().from(tags);
  }
  
  async getTagBySlug(slug: string): Promise<Tag | undefined> {
    const [tag] = await db.select().from(tags).where(eq(tags.slug, slug));
    return tag;
  }
  
  async createTag(insertTag: InsertTag): Promise<Tag> {
    // 이름으로 슬러그 생성
    if (!insertTag.slug) {
      insertTag.slug = slugify(insertTag.name);
    }
    
    const [tag] = await db
      .insert(tags)
      .values(insertTag)
      .returning();
    
    return tag;
  }
  
  // 포스트-태그 관계 관련 메서드
  async addTagToPost(postId: number, tagId: number): Promise<void> {
    // 이미 연결되어 있는지 확인
    const existing = await db
      .select()
      .from(postsTags)
      .where(and(
        eq(postsTags.postId, postId),
        eq(postsTags.tagId, tagId)
      ));
    
    // 연결되어 있지 않은 경우에만 추가
    if (existing.length === 0) {
      await db
        .insert(postsTags)
        .values({ postId, tagId });
    }
  }
  
  async removeTagFromPost(postId: number, tagId: number): Promise<void> {
    await db
      .delete(postsTags)
      .where(and(
        eq(postsTags.postId, postId),
        eq(postsTags.tagId, tagId)
      ));
  }
  
  async getPostTags(postId: number): Promise<Tag[]> {
    // 포스트에 연결된 태그들 조회
    const postTagsResult = await db
      .select()
      .from(postsTags)
      .where(eq(postsTags.postId, postId));
    
    if (postTagsResult.length === 0) {
      return [];
    }
    
    // 태그 ID 추출
    const tagIds = postTagsResult.map(pt => pt.tagId);
    
    // 태그 정보 조회
    return await db
      .select()
      .from(tags)
      .where(inArray(tags.id, tagIds));
  }
  
  async getPostsByTagSlug(tagSlug: string): Promise<Post[]> {
    // 태그 슬러그로 태그 ID 찾기
    const [tag] = await db
      .select()
      .from(tags)
      .where(eq(tags.slug, tagSlug));
    
    if (!tag) {
      return [];
    }
    
    // 태그 ID로 연결된 포스트 ID 찾기
    const postTagsResult = await db
      .select()
      .from(postsTags)
      .where(eq(postsTags.tagId, tag.id));
    
    if (postTagsResult.length === 0) {
      return [];
    }
    
    // 포스트 ID 추출
    const postIds = postTagsResult.map(pt => pt.postId);
    
    // 포스트 정보 조회
    return await db
      .select()
      .from(posts)
      .where(inArray(posts.id, postIds))
      .orderBy(desc(posts.createdAt));
  }
}

export const storage = new DatabaseStorage();