import type { Request, Response } from "express";
import { signupPayloadModel } from "./models.js";
import { db } from "../../db/index.js";
import { userTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto";

class AuthenticationController {
    public async handleSignup(req: Request, res: Response) {
        const validationResult = await signupPayloadModel.safeParseAsync(
            req.body,
        );
        if (validationResult.error)
            return res.status(400).json({
                message: "Body Validation Failed",
                error: validationResult.error.issues,
            });

        const { firstName, lastName, email, password } = validationResult.data;
        const userEmailResult = await db
            .select()
            .from(userTable)
            .where(eq(userTable.email, email)); //returns an array
        if (userEmailResult.length > 0)
            return res.status(400).json({
                error: "Duplicate entry",
                message: `User with ${email} already exists.`,
            });

        const salt = randomBytes(32).toString("hex");
        const hash = createHmac("sha256", salt).update(password).digest("hex"); // plain form me return kro: digest'

        const [result] = await db
            .insert(userTable)
            .values({
                firstName,
                lastName,
                email,
                password: hash,
                salt,
            })
            .returning({ id: userTable.id }); //by default return nhi krta

        return res
            .status(201)
            .json({
                message: "user has been created successfully",
                data: { id: result?.id },
            });
    }
}

export default AuthenticationController;
