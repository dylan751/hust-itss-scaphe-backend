import { Router } from 'express';

import * as photoController from '../controllers/photo.controller';

const router = Router();

router
  .route('/')
  .get(photoController.getPhotos)
  .post(photoController.createPhotos);

router
  .route('/:id')
  .get(photoController.getPhotoById)
  .patch(photoController.updatePhoto)
  .delete(photoController.deletePhoto);

export default router;
