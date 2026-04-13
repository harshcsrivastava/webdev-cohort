import Team from "../models/team.model.js";
import Player from "../models/player.model.js";
import ApiError from "../../../utils/api-error.js";

// CRUD

const transferPlayer = async (playerId, newTeamId) => {
    const team = await Team.findById(newTeamId);
    if (!team) throw ApiError.notFound("Team not found");

    const player = await Player.findByIdAndUpdate(
        playerId,
        { teamId: newTeamId },
        { new: true, runValidators: true },
    ).populate("teamId", "name"); // pura team connect hojayega usme se sirf name field ayegi sath me

    if (!player) throw ApiError.notFound("player not found");

    return player;
};

const updatePlayerRole = async (playerId, role) => {
    const player = await Player.findByIdAndUpdate(
        playerId,
        { role },
        { new: true, runValidators: true },
    );

    if (!player) throw ApiError.notFound("player not found");

    return player;
};

export { transferPlayer, updatePlayerRole };
