import { Router } from "express";
import * as controller from "./auth.controller.js";
import validate from "../../common/middleware/validate-middleware.js";
import RegisterDto from "./dto/register.dto.js";
import { authenticate, authorize } from "./auth.middleware.js";
import LoginDto from "./dto/login.dto.js";
import ForgotPasswordDto from "./dto/forgot-password.dto.js";
import ResetPasswordDTO from "./dto/reset-password.dto.js";
import ApiResponse from "../../utils/api-response.js";
const router = Router();

// router.post("/add-blog", ) //agar har blog me authenticate karunga to bahut chaotic hoga, therefore we can use isLoffedIn() nam se middleware banadu
// refresh, resetPassword, verifyEmail

router.get("/health", (req, res) => {
  return ApiResponse.ok(res, "Up and Runnning")
})
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
    validate(ResetPasswordDTO),
    controller.resetPassword,
);
router.get("/me", authenticate, controller.getMe);

export default router;
