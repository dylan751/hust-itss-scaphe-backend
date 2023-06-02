export type StarType = 1 | 2 | 3 | 4 | 5; // 1, 2, 3, 4, 5 stars

export interface RatingInterface {
  id: string;
  userId: string;
  shopId: string;
  star: StarType;
  content: string;
}
