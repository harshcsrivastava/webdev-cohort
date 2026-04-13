import mongoose from "mongoose";

const teamBroadcasterSchema = new mongoose.Schema(
    {
        teamId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            required: [true, "Team is required"],
        },

        broadcasterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Broadcaster",
            required: [true, "Broadcaster is required"],
        },
    },
    { timestamps: true },
);

/* The line `teamBroadcasterSchema.index({teamId: 1, sponsorId: 1}, {unique: true})` in the Mongoose schema
is creating a compound index on the `teamId` and `sponsorId` fields of the `teamBroadcasterSchema`. It projects teamId, sponsorId*/
teamBroadcasterSchema.index({teamId: 1, broadcasterId: 1}, {unique: true})

export default mongoose.model("TeamBroadcaster", teamBroadcasterSchema);
