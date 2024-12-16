import express, { Request, Response, NextFunction, RequestHandler } from "express";
import { checkAuth, forgotPassword, login, logout, resetPassword, signup, updateProfile, verifyEmail } from "../controller/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.route("/check-auth").get(isAuthenticated as RequestHandler, (req: Request, res: Response, next: NextFunction) => {
  checkAuth(req, res).catch(next);
});

router.route("/signup").post((req: Request, res: Response) => {
  signup(req, res);
});

router.route("/login").post((req: Request, res: Response, next: NextFunction) => {
  login(req, res).catch(next);
});

router.route("/logout").post((req: Request, res: Response, next: NextFunction) => {
  logout(req, res).catch(next);
});

router.route("/verify-email").post((req: Request, res: Response, next: NextFunction) => {
  verifyEmail(req, res).catch(next);
});

router.route("/forgot-password").post((req: Request, res: Response, next: NextFunction) => {
  forgotPassword(req, res).catch(next);
});

router.route("/reset-password/:token").post((req: Request, res: Response, next: NextFunction) => {
  resetPassword(req, res).catch(next);
});

router.route("/profile/update").put(isAuthenticated as RequestHandler, (req: Request, res: Response, next: NextFunction) => {
  updateProfile(req, res).catch(next);
});

export default router;