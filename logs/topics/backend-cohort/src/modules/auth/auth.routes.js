import { Router } from "express";
import { register, login, logout, getMe } from "./auth.controller";
import validate from "../../common/middleware/validate-middleware";
import RegisterDto from "./dto/register.dto";
import { authenticate, authorize } from "./auth.middleware.js";
import LoginDto from "./dto/login.dto.js";

const router = Router();

// router.post("/add-blog", ) //agar har blog me authenticate karunga to bahut chaotic hoga, therefore we can use isLoffedIn() nam se middleware banadu
// refresh, resetPassword, verifyEmail

router.post("/register", validate(RegisterDto), controller.register);
router.post("/login", validate(LoginDto), controller.login);
router.post("/refresh-token", controller.refreshToken);
router.post("/logout", authenticate, controller.logout);
router.get("/verify-email/:token", controller.verifyEmail);
router.post(
    "/forgot-password",
    validate(ForgotPasswordDto),
    controller.forgotPassword,
);
router.put(
    "/reset-password/:token",
    validate(ResetPasswordDto),
    controller.resetPassword,
);
router.get("/me", authenticate, controller.getMe);

export default router;
