import Rating from '../models/rating.model';
import { RatingInterface } from '../interfaces/rating';
import { DEFAULT_AVG_STAR } from '../constants/Star';

export const calculateRating = async (shopId: string): Promise<number> => {
  const ratings: RatingInterface[] = await Rating.find({ shopId });

  if (ratings.length === 0) {
    console.log(`Can't find the rating for ${shopId}`);
  }

  let sumRating = 0;
  ratings.forEach((rating: RatingInterface) => (sumRating += rating.star));
  const avgRating: number = sumRating / ratings.length;

  if (isNaN(avgRating)) {
    return DEFAULT_AVG_STAR;
  }

  return avgRating;
};
