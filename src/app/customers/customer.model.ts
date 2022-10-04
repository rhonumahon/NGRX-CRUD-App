export interface Customer {
  id: number;
  name: string;
  phone: string;
  address: string;
  membership: string;
}

export interface CustomerResponse {
  data: Customer[];
  total: number;
}
