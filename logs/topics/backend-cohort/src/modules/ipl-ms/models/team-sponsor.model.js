import mongoose from "mongoose";

const teamSponsorSchema = new mongoose.Schema(
    {
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: [true, "Team is required"],
        },

        sponsorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sponsor",
            required: [true, "Sponsor is required"],
        },
    },
    { timestamps: true },
);

/* The line `teamSponsorSchema.index({teamId: 1, sponsorId: 1}, {unique: true})` in the Mongoose schema
is creating a compound index on the `teamId` and `sponsorId` fields of the `teamSponsorSchema`. It projects teamId, sponsorId*/
teamSponsorSchema.index({teamId: 1, sponsorId: 1}, {unique: true})

export default mongoose.model("TeamSponsor", teamSponsorSchema);
