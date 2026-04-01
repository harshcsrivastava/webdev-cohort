import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { userTable } from "../../db/schema.js";
import type { SignupUser } from "./utils/user.interface.js";
import ApiError from "../../utils/ApiError.js";
import { createHmac, randomBytes } from "node:crypto";

class AuthenticationService {
    private hashFunction(password: string) {
        // hash password using custom salt for each user
        const salt = randomBytes(32).toString("hex");
        const hash = createHmac("sha256", salt).update(password).digest("hex");

        return { salt, hash };
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
        const { salt, hash } = this.hashFunction(password);

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
}

export default AuthenticationService;
