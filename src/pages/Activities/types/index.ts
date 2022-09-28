export interface IActivity {
  id: number;
  description: string;
  date: string;
  kind: string;
  address: string;
  teacher_id: number;
  active: boolean;
}

export type FilterOptions = 'all' | 'active' | 'inactive';
