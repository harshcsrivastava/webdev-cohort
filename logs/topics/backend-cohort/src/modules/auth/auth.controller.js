import ApiError from "../../utils/api-error.js";
import ApiResponse from "../../utils/api-response.js";
import * as authService from "./auth.service.js";
// Just call whatever is required

const register = async (req, res) => {
    const user = await authService.register(req.body);
    ApiResponse.created(res, "Registration success", user);
};

const login = async (req, res) => {
    const { user, accessToken, refreshToken } = await authService.login(
        req.body,
    );

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    ApiResponse.ok(res, "Login Successfull", { user, accessToken });
};

const refreshToken = async (req, res) => {
    const token = req.cookies?.refreshToken;
    const { accessToken } = await authService.refresh(token);
    ApiResponse.ok(res, "Token refreshed", { accessToken });
};

const logout = async (req, res) => {
    await authService.logout(req.user.id);
    res.clearCookie("refreshToken");
    ApiResponse.ok(res, "Logged out successfully");
};

const verifyEmail = async (req, res) => {
    await authService.verifyEmail(req.params.token);
    ApiResponse.ok(res, "Email verified successfully");
};

const forgotPassword = async (req, res) => {
    await authService.forgotPassword(req.body.email);
    ApiResponse.ok(res, "Password reset email sent");
};

const resetPassword = async (req, res) => {
    await authService.resetPassword(req.params.token, req.body.password);
    ApiResponse.ok(res, "Password reset successful");
};

const getMe = async (req, res) => {
    const user = await authService.getMe(req.user.id);
    ApiResponse.ok(res, "User profile", user);
};

const uploadAvatar = async (req, res) => {
    try {
        const file = req.file;
        if (!file) throw ApiError.badRequest("File not uploaded by user");

        const result = await authService.avatarUpload(req.user.id, file);
        return ApiResponse.ok(res, "Avatar Lock and Loaded", {
            avatarUrl: result.url,
        });
    } catch (error) {
        throw ApiError.conflict(error.message || "Failed to upload");
    }
};

export {
    register,
    login,
    refreshToken,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
    getMe,
    uploadAvatar,
};
