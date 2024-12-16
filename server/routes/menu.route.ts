import express, { RequestHandler, Request, Response, NextFunction } from "express";
import upload from "../middlewares/multer";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { addMenu, editMenu } from "../controller/menu.controller";

const router = express.Router();

router.route("/").post(
  isAuthenticated as RequestHandler, 
  upload.single("image"), 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await addMenu(req, res);
    } catch (error) {
      next(error);
    }
  }
);

router.route("/:id").put(
  isAuthenticated as RequestHandler, 
  upload.single("image"), 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await editMenu(req, res);
    } catch (error) {
      next(error);
    }
  }
);

export default router;