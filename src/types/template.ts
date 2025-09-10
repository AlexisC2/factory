export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
}