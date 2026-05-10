export interface User {
  id: string;
  username: string;
  email: string;
  role: string; // 'admin' | 'user'
  password?: string; // bcrypt hash in demo data
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  ingredients: Ingredient[];
  createdBy: string;
  createdAt: Date;
}

export interface Rating {
  id: string;
  userId: string;
  bookId: string;
  bookclubId: string;
  score: number;
  comment?: string;
  createdAt: Date;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  categoryId: string;
  publishedAt?: string;
  createdAt?: string;
}

export interface BookclubMember {
  userId: string;
  joinedAt: string;
}

export interface Bookclub {
  id: string;
  name: string;
  description: string;
  monthlyBookId?: string | null;
  books: Book[];
  members: BookclubMember[];
  createdAt?: string;
}