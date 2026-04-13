import Team from "../models/team.model.js";
import ApiError from "../../../utils/api-error.js";
import Broadcaster from "../models/broadcaster.model.js";
import TeamBroadcaster from "../models/team-broadcaster.model.js";

const assignBroadcaster = async ({ teamId, broadcasterId }) => {
    const team = await Team.findById(teamId);
    if (!team) throw ApiError.notFound("Team not found");

    const broadcaster = await Broadcaster.findById(broadcasterId);
    if (!broadcaster) throw ApiError.notFound("sponsor not found");

    const existing = await TeamBroadcaster.findOne({ teamId, broadcasterId });
    if (existing) {
        throw ApiError.conflict("Broadcaster already attached.");
    }

    const teamBroad = await TeamBroadcaster.create({ teamId, broadcasterId });

    return teamBroad;
};
