export type ShopTrafficType = 0 | 1 | 2 | 3 | 4 | 5; // 0(few), 1(moderate), 2(a bit crowded), 3(crowded), 4(out of seats), 5(closed)

export interface ShopInterface {
  _id: string;
  name: string;
  phone: string;
  city: string;
  district: string;
  email: string;
  avatar: string;
  password: string;
  traffic: ShopTrafficType;
}
