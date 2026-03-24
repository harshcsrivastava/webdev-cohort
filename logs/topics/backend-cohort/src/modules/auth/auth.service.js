// Business logic should always be on service in Springboot, nextjs, rubyRails
// Jiska kaam uska schema ko bula lo
// Always with capital-letter
import ApiError from "../../utils/api-error";
import User from "./auth.models.js";
import crypto from "crypto";
import {
    generateAccessToken,
    generateRefreshToken,
    generateResetToken,
    verifyRefreshToken,
} from "./jwt.utils.js";

const hashedToken = (token) =>
    crypto.createHash("sha").update(token).digest("hex");

const register = async ({ name, email, password, role }) => {
    // do user registration
    const existingUser = await User.findOne({ email }); //ek bhi user jiska email same ho
    if (existingUser) throw ApiError.conflict("Email already exists");

    const { rawToken, hashedToken } = generateResetToken();
    // rawToken - user ko mail krdenge
    // hashedToken - DB me jayega

    const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken: hashedToken,
    });

    // TODO: send an email to user with token: rawToken

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.verificationToken;

    return userObj;
};

const login = async ({ email, password }) => {
    // take email and verify in DB
    // check if password is correct
    // check isVerified or not
    // generate a access token and refresh token

    const user = await User.findOne({ email }).select("+password");
    if (!user) throw ApiError.unauthorized();

    // somehow i check password

    if (!user.isVerified) throw ApiError.forbidden("Verify email before login");

    // send user access and bearer token
    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id });

    user.refreshToken = hashedToken(refreshToken);
    await user.save({ validateBeforeSave: false });

    const userObj = user.toObject();

    delete userObj.password;
    delete userObj.refreshToken;
    // TODO : Send as cookie

    return { user: userObj, accessToken, refreshToken };
};

const refresh = async (token) => {
    if (!token) throw ApiError.unauthorized("Refresh ntoken missing");
    const decoded = verifyRefreshToken(token);

    const user = await User.findById(decoded.id).select("+refreshToken");

    if (!user) throw ApiError.unauthorized("User not found");

    if (user.refreshToken !== hashedToken(token)) {
        throw ApiError.unauthorized("Invalid refresh token");
    }

    const accessToken = generateAccessToken({ id: user._id, role: user.role });

    return { accessToken };
};

// logout
// remove refreshtoken from db
const logout = async (userId) => {
    // const user = await User.findById(userId)
    // if (!user) throw ApiError.unauthorized("User not found");

    // user.refreshToken = undefined
    // await user.save({validationBeforeSafe: false})

    await User.findByIdAndUpdate(userId, { refreshToken: null });
};

// user verify kro

const forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw ApiError.notFound("No account with that email");

    const { rawToken, hashedToken } = generateResetToken();
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; //15min

    await User.save();

    // TODO: mail bhejna
};

export { register };
