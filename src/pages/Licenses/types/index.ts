export interface ILicense {
  id: number;
  code: string;
  name: string;
  expiration_date: Date;
  total_uses: number;
  available_uses: number;
  status: string;
}

export type FilterOptions = 'all' | 'active' | 'inactive';
