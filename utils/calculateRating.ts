import Rating from '../models/rating.model';
import { RatingInterface } from '../interfaces/rating';
import { DEFAULT_AVG_STAR } from '../constants/Star';

export const calculateRating = async (shopId: string): Promise<number> => {
  const ratings: RatingInterface[] = await Rating.find({ shopId });

  // If that shop doesn't have rating yet -> Return default value as 3 star
  if (ratings.length === 0) {
    return DEFAULT_AVG_STAR;
  }

  let sumRating = 0;
  ratings.forEach((rating: RatingInterface) => (sumRating += rating.star));
  const avgRating: number = sumRating / ratings.length;

  return avgRating;
};
