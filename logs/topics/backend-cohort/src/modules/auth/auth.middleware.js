import ApiError from "../../utils/api-error";
import { verifyAccessToken } from "../../utils/jwt.utils.js";
import User from "./auth.models.js";

const authenticate = async (req, res, next) => {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        // agar cookie ka likha to cookie-parser package use kro
    }

    if (!token) throw ApiError.unauthorized("Not authenticated");

    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.id);

    if (!user) throw ApiError.unauthorized("User no longer exists");

    req.user = {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
};

    next();
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw ApiError.forbidden(
                "You don't have permission to perform this action",
            );
        }

        next();
    };
};

export { authenticate, authorize };
