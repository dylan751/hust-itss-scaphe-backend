export type ShopStatusType = 0 | 1 | 2; // 0(blocked), 1(in process), 2(blocked)
export type ShopTrafficType = 0 | 1 | 2 | 3 | 4 | 5; // 0(few), 1(moderate), 2(a bit crowded), 3(crowded), 4(out of seats), 5(closed)

export interface ShopInterface {
  id: string;
  name: string;
  status: ShopStatusType;
  phone: string;
  city: string;
  district: string;
  email: string;
  avatar: string;
  traffic: ShopTrafficType;
}
