import type { Request, Response } from "express";
import { signupPayloadModel } from "./authentication.models.js";
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
}

export default AuthenticationController;
