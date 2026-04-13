import ApiError from "../../../utils/api-error.js";
import Owner from "../models/owner.model.js";

const createOwner = async ({ name, company }) => {
    const owner = await Owner.create({ name, company });
    return owner;
};

const getAllOwners = async () => {
    const owners = await Owner.find();
    return owners;
};

const getOwnerById = async (id) => {
    const owner = await Owner.findById(id);

    if (!owner) throw ApiError.notFound("Owner not found");
    return owner;
};

const updateOwners = async (id, { name, company }) => {
    const owners = await Owner.findByIdAndUpdate(
        id,
        { name, company },
        { new: true, runValidators: true },
    );

    if (!owner) throw ApiError.notFound("Owner not found");

    return owners;
};

const deleteOwner = async (id) => {
    await Owner.findByIdAndDelete(id);
};

export { createOwner, getAllOwners, getOwnerById, updateOwners, deleteOwner };
