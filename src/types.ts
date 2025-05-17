export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isImportant: boolean;
  isPublic: boolean;
  isTrashed?: boolean;
  isArchived?: boolean;
  isFavorite?: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}
