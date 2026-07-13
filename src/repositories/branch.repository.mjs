import { Branch } from '../mongoose/schemas/branch.mjs';


let cacheBranchIds = null;

// -- from validationSchema bcoz gonna check the Branches at Service Layer rather then checking here
// -- currently only used from transferproducts , have to clear by using service 
export const getCachedBranchIdsRepo = async () => {
    try {
        if (!cacheBranchIds) {
            const branches = await Branch.find().select('id -_id');
            cacheBranchIds = branches.map(b => b.id);
        }
        return cacheBranchIds;
    } catch (error) {
        throw error;
    }
}

export const getBranchesRepo = async () => {
    return await Branch.find();
}

export const findBranchByIdRepo = async (id) => {
    const foundBranch = await Branch.findOne({ id: id });
    return foundBranch;
}

export const findBranchesByIdsRepo = async (branchIds) => {
    return await Branch.find({
        _id: { $in: branchIds }
    });
};

export const createBranchRepo = async (branchData) => {
    const newBranch = new Branch(branchData);
    const savedBranch = await newBranch.save();
    return savedBranch;
}

export const updateBranchRepo = async (id, branchData) => {
    const updatedBranch = await Branch.findOneAndUpdate(
        { id: id },
        branchData, { new: true, runValidators: true });
    return updatedBranch;
}

export const deleteBranchRepo = async (id) => {
    const deletedBranch = await Branch.findOneAndDelete({ id: id });
    return deletedBranch;
}