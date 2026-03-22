import ApiResponse from "../../utils/api-response.js";
import * as authService from "./auth.service.js";
// Just call whatever is required

const register = async (req, res) => {
    const user = await authService.register(req.body);
    ApiResponse.created(res, "Registration success", user);
};

export { register };
