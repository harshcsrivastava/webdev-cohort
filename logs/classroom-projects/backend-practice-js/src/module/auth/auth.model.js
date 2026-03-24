import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        // name, email, password, role, isVerified, refreshToken, resetToken, resetTokenExpiration
        name: {
            type: String,
            trim: true,
            minlength: 2,
            maxlength: 50,
            required: true,
        },
        email: {
            type: String,
            trim: true,
            unique: true,
            required: [true, "Email is required"],
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 8,
            select: false,
        },
        role: {
            type: String,
            enum: ["customer", "seller", "admin"],
            default: "customer",
        },

        isVerified: {
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
            type: String, 
            select: false,
        },
    },
    { timestamps: true },
);

export default mongoose.model("User", userSchema);
