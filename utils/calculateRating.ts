import Rating from '../models/rating.model';
import { RatingInterface } from '../interfaces/rating';

export const calculateRating = async (shopId: string): Promise<number> => {
  const ratings: RatingInterface[] = await Rating.find({ shopId });

  if (ratings.length === 0) {
    console.log(`Can't find the rating for ${shopId}`);
  }

  let sumRating = 0;
  ratings.forEach((rating: RatingInterface) => (sumRating += rating.star));
  const avgRating: number = sumRating / ratings.length;

  return avgRating;
};
