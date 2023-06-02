export type DayType = 2 | 3 | 4 | 5 | 6 | 7 | 8; // 2(Mon), 3(Tue), 4(Wed), 5(Thu), 6(Fri), 7(Sat), 8(Sun)

export interface OpenHourInterface {
  id: string;
  shopId: string;
  day: DayType;
  openTime: Date;
  closeTime: Date;
}
