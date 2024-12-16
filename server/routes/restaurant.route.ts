import express, { Request, Response, NextFunction, RequestHandler } from "express";
import { 
  createRestaurant, 
  getRestaurant, 
  getRestaurantOrder, 
  getSingleRestaurant, 
  searchRestaurant, 
  updateOrderStatus, 
  updateRestaurant 
} from "../controller/restaurant.controller";
import upload from "../middlewares/multer";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

// Wrap the controller functions to ensure correct type signature
const wrapHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void | Response>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

router.route("/").post(
  isAuthenticated as RequestHandler, 
  upload.single("imageFile"), 
  wrapHandler(createRestaurant)
);

router.route("/").get(
  isAuthenticated as RequestHandler, 
  wrapHandler(getRestaurant)
);

router.route("/").put(
  isAuthenticated as RequestHandler, 
  upload.single("imageFile"), 
  wrapHandler(updateRestaurant)
);

router.route("/order").get(
  isAuthenticated as RequestHandler, 
  wrapHandler(getRestaurantOrder)
);

router.route("/order/:orderId/status").put(
  isAuthenticated as RequestHandler, 
  wrapHandler(updateOrderStatus)
);

router.route("/search/:searchText").get(
  isAuthenticated as RequestHandler, 
  wrapHandler(searchRestaurant)
);

router.route("/:id").get(
  isAuthenticated as RequestHandler, 
  wrapHandler(getSingleRestaurant)
);

export default router;