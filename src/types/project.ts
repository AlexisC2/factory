export interface Project {
  id: string;
  name: string;
  description: string;
  userId: string;
  templateId?: string;
  status: 'draft' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}