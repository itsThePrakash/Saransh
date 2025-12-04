export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  imageUrl: string;
  date: string;
  author: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export type Theme = 'light' | 'dark';