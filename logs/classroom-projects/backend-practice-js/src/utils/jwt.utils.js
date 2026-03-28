import jwt from "jsonwebtoken";
import crypto from "crypto";

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_SECRET_EXPIRES_IN,
    });
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
};

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_SECRET_EXPIRES_IN,
    });
};

const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
};

const generateResetToken = () => {
    const rawToken = crypto.randomBytes(32);
    const hashedToken = crypto.createHash("sha").update(rawToken).digest("hex");

    return { rawToken, hashedToken };
};

export {
    generateAccessToken,
    verifyAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
    generateResetToken,
};
