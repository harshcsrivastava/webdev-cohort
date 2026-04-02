import type { Request, Response } from "express";
import {
    signinPayloadModel,
    signupPayloadModel,
} from "./authentication.models.js";
import ApiError from "../../utils/ApiError.js";
import AuthenticationService from "./authentication.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

class AuthenticationController {
    public async handleSignup(req: Request, res: Response) {
        const validatedData = await signupPayloadModel.safeParseAsync(req.body);
        if (validatedData.error) {
            throw ApiError.badRequest(
                "ZOD Error: Insufficient Credentials",
                validatedData.error.issues,
            );
        }

        const authService = new AuthenticationService();
        const user = await authService.signupService(validatedData.data);

        return ApiResponse.created(res, "User Created", user);
    }

    public async handlesSignin(req: Request, res: Response) {
        const validatedData = await signinPayloadModel.safeParseAsync(req.body);
        if (validatedData.error) {
            throw ApiError.badRequest(
                "ZOD Error: Insufficient Credentials",
                validatedData.error.issues,
            );
        }

        const authService = new AuthenticationService();
        const { user, accessToken, refreshToken } =
            await authService.signinService(validatedData.data);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return ApiResponse.ok(res, "Sign In Successfull", {
            user,
            accessToken,
        });
    }
}

export default AuthenticationController;
