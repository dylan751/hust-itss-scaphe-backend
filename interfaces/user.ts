export type CountryType = 'ベトナム' | '日本' | '英国';

export interface UserInterface {
  _id: string;
  email: string;
  password: string;
  name: string;
  country: CountryType;
  avatar: string;
}
