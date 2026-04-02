import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { userTable } from "../../db/schema.js";
import type { SigninUser, SignupUser } from "./utils/user.interface.js";
import ApiError from "../../utils/ApiError.js";
import { createHmac, randomBytes } from "node:crypto";
import {
    generateAccessToken,
    generateRefreshToken,
} from "./utils/jwt.token.js";

class AuthenticationService {
    private hashFunction(salt: string, password: string): string {
        // hash password using custom salt for each user
        const hash = createHmac("sha256", salt).update(password).digest("hex");
        return hash;
    }

    private randomSalt(): string {
        const salt = randomBytes(32).toString("hex");
        return salt;
    }
    public async signupService({
        firstName,
        lastName,
        email,
        password,
    }: SignupUser) {
        // check user exists in DB
        const existedUser = await db
            .select()
            .from(userTable)
            .where(eq(userTable.email, email));
        if (existedUser.length > 0)
            throw ApiError.badRequest(
                `User with ${email} already exists`,
                "Duplicate Entry",
            );

        // hash password
        const salt = this.randomSalt();
        const hash = this.hashFunction(salt, password);

        // insert in db
        const [createdUser] = await db
            .insert(userTable)
            .values({
                firstName,
                lastName,
                email,
                password: hash,
                salt,
            })
            .returning({ id: userTable.id });

        return createdUser;
    }

    public async signinService({ email, password }: SigninUser) {
        // check user exists in DB
        const [user] = await db
            .select()
            .from(userTable)
            .where(eq(userTable.email, email));

        // find user
        if (!user) throw ApiError.notFound("User doesnot exist");

        if (!user.password || !user.salt)
            throw ApiError.unauthorized("Incomplete credentials");

        // check password
        if (user.password !== this.hashFunction(user.salt, password))
            throw ApiError.forbidden("Invalid credentials");

        // generate access and refresh token
        const accessToken = generateAccessToken({
            id: user.id,
            role: user.role,
        });

        const refreshToken = generateRefreshToken({ id: user.id });

        // save hashed refresh token in db
        const hashedRefreshToken = this.hashFunction(
            this.randomSalt(),
            refreshToken,
        );
        await db
            .update(userTable)
            .set({ refreshToken: hashedRefreshToken })
            .where(eq(userTable.id, user.id));

        // remove sensitive fields before returning user details
        const {
            emailVerified: _emailVerified,
            password: _password,
            salt: _salt,
            refreshToken: _storedRefreshToken,
            verificationToken: _verificationToken,
            resetPasswordToken: _resetPasswordToken,
            resetPasswordExpires: _resetPasswordExpires,
            createdAt: _createdAt,
            updatedAt: _updatedAt,
            ...safeUser
        } = user;

        return { user: safeUser, accessToken, refreshToken };
    }
}

export default AuthenticationService;
