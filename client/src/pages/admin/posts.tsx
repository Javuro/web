import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  ChevronLeft, 
  Edit, 
  Plus, 
  Trash2,
  Search,
  CheckCircle,
  AlertCircle,
  Calendar,
  Loader2
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts, createPost, updatePost, deletePost } from "@/lib/api/posts";
import { formatDate, truncateText } from "@shared/utils";
import { Badge } from "@/components/ui/badge";
import { Post } from "@shared/schema";
import { insertPostSchema } from "@shared/schema";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const ADMIN_SECRET_KEY = 'javuro-admin-secret';

// 관리자 인증 확인 함수
const getAdminSecret = (): string | null => {
  return localStorage.getItem(ADMIN_SECRET_KEY);
};

// 폼 검증 스키마
const postFormSchema = insertPostSchema.extend({
  tags: z.string().optional(),
}).omit({ authorId: true });

type PostFormValues = z.infer<typeof postFormSchema>;

export default function AdminPosts() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const adminSecret = getAdminSecret();

  // 관리자 인증 확인
  useEffect(() => {
    if (!adminSecret) {
      setLocation('/admin');
    }
  }, [adminSecret, setLocation]);

  // 포스트 목록 로드
  const { 
    data: posts, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['admin', 'posts'],
    queryFn: () => getPosts(),
    enabled: !!adminSecret,
  });

  // 폼 설정
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: '',
      content: '',
      excerpt: '',
      category: 'announcement',
      published: true,
      isPinned: false,
      tags: '',
    },
  });

  // 포스트 생성 뮤테이션
  const createPostMutation = useMutation({
    mutationFn: (values: PostFormValues) => {
      if (!adminSecret) throw new Error('Admin secret not found');
      
      // tags 문자열을 배열로 변환
      const tagsArray = values.tags ? values.tags.split(',').map(tag => tag.trim()) : [];
      const postData = { ...values, tags: tagsArray };
      
      return createPost(postData, adminSecret);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Post created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['admin', 'posts'] });
      setIsFormDialogOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create post",
        variant: "destructive",
      });
    },
  });

  // 포스트 업데이트 뮤테이션
  const updatePostMutation = useMutation({
    mutationFn: (values: PostFormValues & { id: number }) => {
      if (!adminSecret) throw new Error('Admin secret not found');
      
      // tags 문자열을 배열로 변환
      const tagsArray = values.tags ? values.tags.split(',').map(tag => tag.trim()) : [];
      const { id, ...postData } = values;
      
      return updatePost(id, { ...postData, tags: tagsArray }, adminSecret);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Post updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['admin', 'posts'] });
      setIsFormDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update post",
        variant: "destructive",
      });
    },
  });

  // 포스트 삭제 뮤테이션
  const deletePostMutation = useMutation({
    mutationFn: (id: number) => {
      if (!adminSecret) throw new Error('Admin secret not found');
      return deletePost(id, adminSecret);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['admin', 'posts'] });
      setIsDeleteDialogOpen(false);
      setPostToDelete(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete post",
        variant: "destructive",
      });
    },
  });

  // 폼 제출 처리
  const onSubmit = (values: PostFormValues) => {
    if (selectedPost) {
      updatePostMutation.mutate({ ...values, id: selectedPost.id });
    } else {
      createPostMutation.mutate(values);
    }
  };

  // 수정 버튼 클릭 처리
  const handleEditClick = (post: Post) => {
    setSelectedPost(post);
    
    // 폼에 기존 데이터 설정
    form.reset({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || '',
      category: post.category,
      published: post.published,
      isPinned: post.isPinned,
      tags: post.tags ? post.tags.map(tag => tag.name).join(', ') : '',
    });
    
    setIsFormDialogOpen(true);
  };

  // 생성 버튼 클릭 처리
  const handleCreateClick = () => {
    setSelectedPost(null);
    form.reset({
      title: '',
      content: '',
      excerpt: '',
      category: 'announcement',
      published: true,
      isPinned: false,
      tags: '',
    });
    setIsFormDialogOpen(true);
  };

  // 삭제 버튼 클릭 처리
  const handleDeleteClick = (post: Post) => {
    setPostToDelete(post);
    setIsDeleteDialogOpen(true);
  };

  // 삭제 확인 처리
  const handleDeleteConfirm = () => {
    if (postToDelete) {
      deletePostMutation.mutate(postToDelete.id);
    }
  };

  // 포스트 필터링
  const filteredPosts = posts?.filter(post => {
    let matchesSearch = true;
    let matchesCategory = true;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      matchesSearch = post.title.toLowerCase().includes(query) || 
                    post.content.toLowerCase().includes(query);
    }
    
    if (categoryFilter) {
      matchesCategory = post.category === categoryFilter;
    }
    
    return matchesSearch && matchesCategory;
  }) || [];

  // 카테고리별 배지 색상
  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case 'announcement':
        return 'secondary';
      case 'update':
        return 'default';
      case 'news':
        return 'outline';
      case 'event':
        return 'destructive';
      case 'blog':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  if (!adminSecret) {
    return null;
  }

  return (
    <div className="bg-background">
      <main className="container mx-auto px-4 py-20">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            className="mr-4"
            onClick={() => setLocation('/admin')}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Content Management</h1>
            <p className="text-muted-foreground">Manage announcements, news, and blog posts</p>
          </div>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm border-gray-800 mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    className="pl-8 bg-background"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select 
                  value={categoryFilter} 
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-[180px] bg-background">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="announcement">Announcement</SelectItem>
                    <SelectItem value="update">Update</SelectItem>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="blog">Blog</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button 
                className="bg-[#3A86FF] hover:bg-[#3A86FF]/80"
                onClick={handleCreateClick}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>
            
            {error ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Failed to load posts. Please try again.
                </AlertDescription>
              </Alert>
            ) : isLoading ? (
              <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center p-8 border border-dashed rounded-md">
                <p className="text-muted-foreground">No posts found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {post.isPinned && (
                              <Badge variant="outline" className="bg-[#3A86FF]/10 text-[#3A86FF]">
                                Pinned
                              </Badge>
                            )}
                            <span className={post.isPinned ? 'font-semibold' : ''}>
                              {truncateText(post.title, 40)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getCategoryBadgeVariant(post.category)}>
                            {post.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {post.published ? (
                              <>
                                <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                                <span className="text-sm">Published</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                                <span className="text-sm">Draft</span>
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(post.createdAt)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleEditClick(post)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteClick(post)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* 폼 다이얼로그 */}
      <Dialog 
        open={isFormDialogOpen} 
        onOpenChange={setIsFormDialogOpen}
      >
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{selectedPost ? 'Edit Post' : 'Create New Post'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter post title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="announcement">Announcement</SelectItem>
                          <SelectItem value="update">Update</SelectItem>
                          <SelectItem value="news">News</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                          <SelectItem value="blog">Blog</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter tags separated by commas" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        rows={10}
                        placeholder="Enter post content"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        rows={3}
                        placeholder="Enter a short excerpt"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Published</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Make this post visible to users
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isPinned"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Pinned</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Pin this post to the top of the list
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter className="pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsFormDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={createPostMutation.isPending || updatePostMutation.isPending}
                >
                  {(createPostMutation.isPending || updatePostMutation.isPending) && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  {selectedPost ? 'Update' : 'Create'} Post
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* 삭제 확인 다이얼로그 */}
      <Dialog 
        open={isDeleteDialogOpen} 
        onOpenChange={setIsDeleteDialogOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-destructive">Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-2">Are you sure you want to delete this post?</p>
            <p className="font-semibold mb-4">{postToDelete?.title}</p>
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>This action cannot be undone.</AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deletePostMutation.isPending}
            >
              {deletePostMutation.isPending && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}