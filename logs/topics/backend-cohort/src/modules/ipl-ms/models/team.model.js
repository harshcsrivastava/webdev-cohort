import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Team Name is required"],
        trim: true,
        minlength: 2,
        maxlength: 100,
    },

    // Refrencing as discussed - Both type & ref are required.
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: [true, "Owner is Required."]
    },
}, {timestamps: true});

export default mongoose.model("Team", teamSchema);
