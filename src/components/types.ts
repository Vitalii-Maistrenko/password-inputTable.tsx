export interface MyForm {
  login: string;
  parol: string;
}

export interface DataItem {
  id: number;
  name: string;
  email: string;
  phone_number: number;
  address: string;
  [key: string]: string | number;
}