import { Branch } from '../mongoose/schemas/branch.mjs';

let cacheBranchIds = null;

export const getCachedBranchIds = async () => {
    if (!cacheBranchIds) {
        const branches = await Branch.find().select('id -_id');
        cacheBranchIds = branches.map(b => b.id);
    }
    return cacheBranchIds;
}