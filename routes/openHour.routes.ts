import { Router } from 'express';

import * as openHourController from '../controllers/openHour.controller';

const router = Router();

router
  .route('/')
  .get(openHourController.getOpenHours)
  .post(openHourController.createOpenHour);

router
  .route('/:id')
  .get(openHourController.getOpenHourById)
  .patch(openHourController.updateOpenHour)
  .delete(openHourController.deleteOpenHour);

export default router;
