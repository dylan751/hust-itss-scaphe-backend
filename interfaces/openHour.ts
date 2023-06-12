export type DayType = 1 | 2 | 3 | 4 | 5 | 6 | 7; // 1(Sun), 2(Mon), 3(Tue), 4(Wed), 5(Thu), 6(Fri), 7(Sat)

export interface OpenHourInterface {
  _id: string;
  shopId: string;
  day: DayType;
  openTime: Date;
  closeTime: Date;
}
