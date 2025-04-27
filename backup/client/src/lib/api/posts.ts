import { Post, Tag } from "@shared/schema";

interface GetPostsOptions {
  limit?: number;
  offset?: number;
  category?: string;
  published?: boolean;
  search?: string;
}

interface PostWithTags extends Post {
  tags: Tag[];
}

/**
 * 포스트 목록을 가져오는 함수
 */
export async function getPosts(options: GetPostsOptions = {}): Promise<Post[]> {
  const queryParams = new URLSearchParams();
  
  if (options.limit !== undefined) {
    queryParams.append('limit', options.limit.toString());
  }
  
  if (options.offset !== undefined) {
    queryParams.append('offset', options.offset.toString());
  }
  
  if (options.category) {
    queryParams.append('category', options.category);
  }
  
  if (options.published !== undefined) {
    queryParams.append('published', options.published.toString());
  }
  
  if (options.search) {
    queryParams.append('search', options.search);
  }
  
  const response = await fetch(`/api/posts?${queryParams.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  
  return await response.json();
}

/**
 * 단일 포스트를 가져오는 함수
 */
export async function getPostBySlug(slug: string): Promise<PostWithTags> {
  const response = await fetch(`/api/posts/${slug}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }
  
  return await response.json();
}

/**
 * 태그 목록을 가져오는 함수
 */
export async function getTags(): Promise<Tag[]> {
  const response = await fetch('/api/tags');
  
  if (!response.ok) {
    throw new Error('Failed to fetch tags');
  }
  
  return await response.json();
}

/**
 * 특정 태그의 포스트 목록을 가져오는 함수
 */
export async function getPostsByTag(tagSlug: string): Promise<Post[]> {
  const response = await fetch(`/api/tags/${tagSlug}/posts`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch posts by tag');
  }
  
  return await response.json();
}

// 관리자 API 함수들

/**
 * 새 포스트 생성 함수 (관리자용)
 */
export async function createPost(post: any, adminSecret: string): Promise<Post> {
  const response = await fetch('/api/admin/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Secret': adminSecret
    },
    body: JSON.stringify(post)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create post');
  }
  
  return await response.json();
}

/**
 * 포스트 수정 함수 (관리자용)
 */
export async function updatePost(id: number, post: any, adminSecret: string): Promise<Post> {
  const response = await fetch(`/api/admin/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Secret': adminSecret
    },
    body: JSON.stringify(post)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update post');
  }
  
  return await response.json();
}

/**
 * 포스트 삭제 함수 (관리자용)
 */
export async function deletePost(id: number, adminSecret: string): Promise<void> {
  const response = await fetch(`/api/admin/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'X-Admin-Secret': adminSecret
    }
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete post');
  }
}