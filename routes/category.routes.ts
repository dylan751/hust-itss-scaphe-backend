import { Router } from 'express';

import * as categoryController from '../controllers/category.controller';

const router = Router();

router
  .route('/')
  .get(categoryController.getCategories)
  .post(categoryController.createCategories);

router
  .route('/:id')
  .get(categoryController.getCategoryById)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default router;
