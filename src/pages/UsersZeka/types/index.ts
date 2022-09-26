export interface IUserZeka {
  id: number | string;
  name: string;
  email: string | null;
  role: string;
  active: boolean | null;
}

export type FilterOptions = 'all' | 'active' | 'inactive';
