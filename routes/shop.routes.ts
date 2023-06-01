import { Router } from "express";

import * as shopController from "../controllers/shop.controller";

const router = Router();

router
  .route('/')
  .get(shopController.getAllShops)
  .post(shopController.createShop);

router
  .route('/:id')
  .get(shopController.getShop)
  .patch(shopController.updateShop)
  .delete(shopController.deleteShop);


export default router;