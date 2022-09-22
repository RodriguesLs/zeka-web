export interface IUser {
  id: number | string;
  name: string;
  code: number | string;
  cpf: string | null;
  gender: string | null;
  email: string | null;
  phone: string | number;
  active: boolean | null;
  organization_id: number;
  created_at: Date;
}

export type FilterOptions = 'all' | 'active' | 'inactive';
