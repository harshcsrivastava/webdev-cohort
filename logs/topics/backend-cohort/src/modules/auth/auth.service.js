// Business logic should always be on service in Springboot, nextjs, rubyRails
// Jiska kaam uska schema ko bula lo
// Always with capital-letter
import ApiError from "../../utils/api-error.js";
import User from "./auth.models.js";
import crypto from "crypto";
import {
    generateAccessToken,
    generateRefreshToken,
    generateResetToken,
    verifyRefreshToken,
} from "../../utils/jwt.utils.js";
import {
    sendVerificationEmail,
    sendResetPasswordEmail,
} from "../../common/config/email.js";
import fs from "node:fs";
import imagekit from "../../common/config/imagekit.js";

const hashToken = (token) =>
    crypto.createHash("sha256").update(token).digest("hex");

const register = async ({ name, email, password, role }) => {
    // do user registration
    const existingUser = await User.findOne({ email }); //ek bhi user jiska email same ho
    if (existingUser) throw ApiError.conflict("Email already exists");

    const { rawToken, hashToken } = generateResetToken();
    // rawToken - user ko mail krdenge
    // hashToken - DB me jayega

    const user = await User.create({
        name,
        email,
        password,
        role,
        verificationToken: hashToken,
    });

    // TODO: send an email to user with token: rawToken
    try {
        await sendVerificationEmail(email, token);
    } catch (error) {
        console.log(error);
    }

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
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw ApiError.unauthorized("Invalid email or password");

    // if (!user.isVerified) throw ApiError.forbidden("Verify email before login");

    // send user access and bearer token
    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id });

    user.refreshToken = hashToken(refreshToken);
    await user.save({ validateBeforeSave: false });

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    return { user: userObj, accessToken, refreshToken };
};

const refresh = async (token) => {
    if (!token) throw ApiError.unauthorized("Refresh ntoken missing");
    const decoded = verifyRefreshToken(token);

    const user = await User.findById(decoded.id).select("+refreshToken");

    if (!user) throw ApiError.unauthorized("User not found");

    if (user.refreshToken !== hashToken(token)) {
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
const verifyEmail = async (token) => {
    const trimmed = String(token).trim();
    if (!trimmed) {
        throw ApiError.badRequest("Invalid or expired verification token");
    }

    // DB stores SHA256(raw). Links / email use the raw token — we hash for lookup.
    // If you paste the hash from MongoDB into Postman, hashing again would not match;
    // so we also try a direct match on the stored value.
    const hashedInput = hashToken(trimmed);
    let user = await User.findOne({ verificationToken: hashedInput }).select(
        "+verificationToken",
    );
    if (!user) {
        user = await User.findOne({ verificationToken: trimmed }).select(
            "+verificationToken",
        );
    }
    if (!user)
        throw ApiError.badRequest("Invalid or expired verification token");

    await User.findByIdAndUpdate(user._id, {
        $set: { isVerified: true },
        $unset: { verificationToken: 1 },
    });

    return user;
};

const forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw ApiError.notFound("No account with that email");

    const { rawToken, hashToken } = generateResetToken();
    user.resetPasswordToken = hashToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; //15min

    await User.save();

    // TODO: mail bhejna
    try {
        await sendResetPasswordEmail(email, rawToken);
    } catch (err) {
        console.error("Failed to send reset email:", err.message);
    }
};

const resetPassword = async (token, newPassword) => {
    const hashedToken = hashToken(token);

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
    }).select("+resetPasswordToken +resetPasswordExpires");

    if (!user) throw ApiError.badRequest("Invalid or expired reset token");

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
};

const getMe = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw ApiError.notFound("No account with that email");
    return user;
};

const avatarUpload = async (userId, file) => {
    try {
        //bigfile ko chunk me use krne pe stream use krte hai
        const fileStream = fs.createReadStream(file.path);
        // abhi disk me kr rhe but usually memory me load krte and cloud me save krte hai
        // dont ever store image in DB
        const uploadResponse = await imagekit.files.upload({
            file: fileStream,
            fileName: file.filename,
            folder: "/user-avatars",
        });

        // if we dont want to use imagekit(cloudinary, imagething) we will configure upload as necessary

        await User.findByIdAndUpdate(
            userId,
            {
                avatar: uploadResponse.url,
            },
            { new: true },
        );

        fs.unlinkSync(file.path);

        return {
            url: uploadResponse.url,
            fileId: uploadResponse.fileId,
        };
    } catch (error) {
        try {
            if (file.path && fs.existsSync(file.path)) fs.unlinkSync(file.path);
        } catch (err) {
            console.log("Error in deleting file: ", err);
        }

        throw error;
    }
};

export {
    register,
    login,
    refresh,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
    getMe,
    avatarUpload,
};
