import Category from '../models/category.model';
import { CategoryInterface } from '../interfaces/category';

export const getShopCategories = async (shopId: string): Promise<string[]> => {
  const categories: CategoryInterface[] = await Category.find({ shopId });

  return categories.map((category) => category.category);
};
