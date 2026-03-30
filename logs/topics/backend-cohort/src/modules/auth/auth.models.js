import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return next(); // ye tab bhi kick-in kare, jab password feel touch ho rha, otherwise return

    // hashing hota to kuch rounds chalte, salt b/w 8-12
    this.password = await bcrypt.hash(this.password, 12);
    
});

// In programming, a “hook” is an extension point — a predefined spot in the code where developers can insert custom logic to modify or extend behavior
// without changing the original source. Hooks intercept or augment execution flow, making systems more flexible and customizable
userSchema.methods.comparePassword = async function (clearTextPassword) {
    //jitne chahe methods daal skte
    return bcrypt.compare(clearTextPassword, this.password); //direct compare => fast
};

export default mongoose.model("User", userSchema);
// Users -> users (lowercase and plural)
