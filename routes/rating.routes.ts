import { Router } from 'express';

import * as ratingController from '../controllers/rating.controller';

const router = Router();

router
  .route('/')
  .get(ratingController.getRatings)
  .post(ratingController.createRating);

router
  .route('/:id')
  .get(ratingController.getRatingById)
  .patch(ratingController.updateRating)
  .delete(ratingController.deleteRating);

router.route('/shop/:shopId').get(ratingController.getRatingsByShopId);
router.route('/user/:userId').get(ratingController.getRatingsByUserId);

export default router;
