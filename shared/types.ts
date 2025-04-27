export interface Announcement {
  id: string;
  title: string;
  content: string;
  fullContent?: string;
  type: 'update' | 'notice' | 'emergency';
  isPinned: boolean;
  createdAt: string;
  readStatus: boolean;
}

export type CreateAnnouncementInput = Omit<Announcement, 'id' | 'createdAt' | 'readStatus'>;
export type UpdateAnnouncementInput = Partial<CreateAnnouncementInput>;
