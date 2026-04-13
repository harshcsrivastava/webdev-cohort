import Team from "../models/team.model.js";
import ApiError from "../../../utils/api-error.js";
import Sponsor from "../models/sponsor.model.js";
import TeamSponsor from "../models/team-sponsor.model.js";

const attachSponsor = async ({ teamId, sponsorId }) => {
    const team = await Team.findById(teamId);
    if (!team) throw ApiError.notFound("Team not found");

    const sponsor = await Sponsor.findById(sponsorId);
    if (!sponsor) throw ApiError.notFound("sponsor not found");

    const existing = await TeamSponsor.findOne({ teamId, sponsorId });
    if (existing) {
        throw ApiError.conflict("Sponsor already attached.");
    }

    const teamspon = await TeamSponsor.create({ teamId, sponsorId });

    return teamspon;
};
