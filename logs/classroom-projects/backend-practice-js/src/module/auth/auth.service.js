import ApiError from "../../utils/api-error.js";
import User from "./auth.model.js";
import {
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    generateResetToken,
} from "./jwt.utils.js";

const hashedFn = (token) =>
    crypto.createHash("sha").update(token).digest("hex");

const register = async ({ email, name, password, role }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new ApiError.conflict();

    const { rawToken, hashedToken } = generateResetToken();

    const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken: hashedToken,
    });

    const userObj = user.toObject();

    delete userObj.password;
    delete userObj.verificationToken;

    return userObj;
};

const login = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new ApiError.unauthorized();

    // checks password
    if (!user.isVerified) throw ApiError.forbidden("Verify email before login");

    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id });

    user.refreshToken = hashedFn(refreshToken);
    await user.save({ validateBeforeSave: false });

    const userObj = user.toObject();

    delete userObj.password;
    delete userObj.refreshToken;

    return { user: userObj, accessToken, refreshToken };
};

const logout = async (userId) => {
    await User.findByIdAndUpdate(userId, { refreshToken: null });
};

const refresh = async (token) => {
    if (!token) throw ApiError.unauthorized("Refresh token missing");

    const decoded = verifyRefreshToken(token);
    const user = await User.findById(decode.id).select("+refreshToken");
    if (!user) throw ApiError.unauthorized("User not found");

    if (user.refreshToken !== hashedFn(token)) {
        throw ApiError.unauthorized("Invalid refresh token");
    }

    const accessToken = generateAccessToken({ id: user._id, role: user.role });

    return { accessToken };
};

const forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw ApiError.notfound("No acccount with that email");

    const { rawToken, hashedToken } = generateResetToken();
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await user.save();
};

export { register, login, logout, refresh, forgotPassword };
