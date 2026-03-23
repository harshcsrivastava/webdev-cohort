import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            minlength: 2,
            maxlength: 50,
            required: true, //has one more syntax for custom syntax -> [true, "Name is required"]
        },

        email: {
            type: String,
            trim: true,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 8,
            select: false, //by-default user ko return na kro ye
            // We know ;)
        },
        role: {
            type: String,
            // enum is followed by default
            enum: ["customer", "seller", "admin"],
            default: "customer",
        },

        isVerifed: {
            type: Boolean,
            default: false,
        },

        verificationToken: {
            type: String,
            select: false,
        },

        refreshToken: {
            type: String,
            select: false,
        },

        resetPasswordToken: {
            type: String,
            select: false,
        },

        resetPasswordExpires: {
            type: Date,
            select: false,
        },
    },
    { timestamps: true },
);

export default mongoose.model("User", userSchema);
// Users -> users (lowercase and plural)
