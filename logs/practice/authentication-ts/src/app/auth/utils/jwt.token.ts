import jwt from "jsonwebtoken";
import "dotenv/config";
import type {
    AccessTokenPayload,
    RefrehTokenPayload,
} from "./user.interface.js";

function getRequiredEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is not defined`);
    }
    return value;
}

export function generateAccessToken(payload: AccessTokenPayload) {
    const secret = getRequiredEnv("JWT_ACCESS_TOKEN_SECRET");
    const expiresIn =
        (process.env
            .JWT_ACCESS_TOKEN_EXPIRATION as jwt.SignOptions["expiresIn"]) ||
        "15m";

    return jwt.sign(payload, secret, {
        expiresIn,
    });
}

export function verifyAccessToken(token: string) {
    const secret = getRequiredEnv("JWT_ACCESS_TOKEN_SECRET");
    return jwt.verify(token, secret);
}

export function generateRefreshToken(payload: RefrehTokenPayload) {
    const secret = getRequiredEnv("JWT_REFRESH_TOKEN_SECRET");
    const expiresIn =
        (process.env
            .JWT_REFRESH_TOKEN_EXPIRATION as jwt.SignOptions["expiresIn"]) ||
        "7d";

    return jwt.sign(payload, secret, {
        expiresIn,
    });
}

export function verifyRefreshToken(token: string) {
    const secret = getRequiredEnv("JWT_REFRESH_TOKEN_SECRET");
    return jwt.verify(token, secret);
}


// res.cookie("accesstoken", accessToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     maxAge: 1000 * 60 *60*24*7
// })