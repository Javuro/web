import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Announcement, CreateAnnouncementInput } from "@shared/types";

// 공지사항 유효성 검사 스키마
const announcementSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  content: z.string().min(1, "내용을 입력해주세요"),
  fullContent: z.string().min(1, "상세 내용을 입력해주세요"),
  type: z.enum(["update", "notice", "emergency"]),
  isPinned: z.boolean(),
});

type AnnouncementFormData = z.infer<typeof announcementSchema>;

export default function AdminAnnouncements() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 공지사항 목록 조회
  const { data: announcements = [] } = useQuery<Announcement[]>({
    queryKey: ["/api/announcements"],
  });

  // 폼 설정
  const form = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: "",
      content: "",
      fullContent: "",
      type: "notice",
      isPinned: false,
    },
  });

  // 공지사항 생성
  const createMutation = useMutation({
    mutationFn: async (data: CreateAnnouncementInput) => {
      const response = await fetch("/api/admin/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.VITE_ADMIN_SECRET}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create announcement");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/announcements"] });
      toast({
        title: "공지사항이 생성되었습니다.",
        description: "새로운 공지사항이 성공적으로 등록되었습니다.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "오류가 발생했습니다.",
        description: error instanceof Error ? error.message : "공지사항 생성 중 문제가 발생했습니다. 다시 시도해주세요.",
      });
    },
  });

  // 공지사항 수정
  const updateMutation = useMutation({
    mutationFn: async (data: AnnouncementFormData & { id: string }) => {
      const response = await fetch(`/api/admin/announcements/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.VITE_ADMIN_SECRET}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update announcement");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/announcements"] });
      toast({
        title: "공지사항이 수정되었습니다.",
        description: "공지사항이 성공적으로 수정되었습니다.",
      });
      setSelectedId(null);
      form.reset();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "오류가 발생했습니다.",
        description: error instanceof Error ? error.message : "공지사항 수정 중 문제가 발생했습니다. 다시 시도해주세요.",
      });
    },
  });

  // 공지사항 삭제
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/announcements/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${process.env.VITE_ADMIN_SECRET}`,
        },
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete announcement");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/announcements"] });
      toast({
        title: "공지사항이 삭제되었습니다.",
        description: "공지사항이 성공적으로 삭제되었습니다.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "오류가 발생했습니다.",
        description: error instanceof Error ? error.message : "공지사항 삭제 중 문제가 발생했습니다. 다시 시도해주세요.",
      });
    },
  });

  const onSubmit = (data: AnnouncementFormData) => {
    if (selectedId) {
      updateMutation.mutate({ ...data, id: selectedId });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">공지사항 관리</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 공지사항 작성 폼 */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">
            {selectedId ? "공지사항 수정" : "새 공지사항 작성"}
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제목</FormLabel>
                    <FormControl>
                      <Input placeholder="공지사항 제목" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>요약 내용</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="목록에 표시될 요약 내용"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>상세 내용</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="상세 페이지에 표시될 전체 내용"
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>공지 유형</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="공지 유형 선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="update">업데이트</SelectItem>
                        <SelectItem value="notice">공지</SelectItem>
                        <SelectItem value="emergency">긴급</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPinned"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>상단 고정</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                {selectedId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedId(null);
                      form.reset();
                    }}
                  >
                    취소
                  </Button>
                )}
                <Button type="submit">
                  {selectedId ? "수정하기" : "등록하기"}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* 공지사항 목록 */}
        <div className="bg-card p-6 rounded-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">공지사항 목록</h2>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="p-4 rounded-lg border border-border hover:border-primary transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{announcement.title}</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedId(announcement.id);
                        form.reset({
                          title: announcement.title,
                          content: announcement.content,
                          fullContent: announcement.fullContent,
                          type: announcement.type,
                          isPinned: announcement.isPinned,
                        });
                      }}
                    >
                      수정
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => {
                        if (window.confirm("정말 삭제하시겠습니까?")) {
                          deleteMutation.mutate(announcement.id);
                        }
                      }}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{announcement.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}