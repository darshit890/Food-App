import express, { Request, Response, NextFunction, RequestHandler } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { createCheckoutSession, getOrders, stripeWebhook } from "../controller/order.controller";

const router = express.Router();

// Modify your controller functions to explicitly handle sending responses
// Instead of returning a response, use res.json(), res.send(), etc.
router.get("/", isAuthenticated as RequestHandler, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getOrders(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/checkout/create-checkout-session", isAuthenticated as RequestHandler, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createCheckoutSession(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/webhook", express.raw({type: 'application/json'}), async (req: Request, res: Response, next: NextFunction) => {
  try {
    await stripeWebhook(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;