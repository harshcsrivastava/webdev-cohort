// Business logic should always be on service in Springboot, nextjs, rubyRails
// Jiska kaam uska schema ko bula lo
// Always with capital-letter
import ApiError from "../../utils/api-error";
import User from "./auth.models.js";
import { generateResetToken } from "./jwt.utils.js";

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

export { register };
