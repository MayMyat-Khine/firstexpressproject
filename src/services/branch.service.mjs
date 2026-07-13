import mongoose from "mongoose";
import { Branch } from "../mongoose/schemas/branch.mjs";
import * as branchRepo from "../repositories/branch.repository.mjs";
import AppErrors from "../utils/appErrors.mjs";

export const createBranch = async (branchData) => {
    return branchRepo.createBranchRepo(branchData);
};

export const findByBranchId = async (id) => {
    const foundBranch = await branchRepo.findBranchByIdRepo(id);
    if (!foundBranch) {
        throw new AppErrors(`Branch ${id} is not found`, 404)
    }
    return foundBranch;
}

export const validateBranches = async (branchIds) => {
    const validBranches = await branchRepo.findBranchesByIdsRepo(branchIds);
    if (branchIds.length != validBranches.length) {
        throw new AppErrors("One or more invalid branch id", 400)
    }
    return branchIds;
}

export const getBranchesData = async (branchIds) => {
    const branches = await branchRepo.findBranchesByIdsRepo(branchIds);
    return branches.map(branch => branch.id);
}

export const getAllBranches = async () => {
    return branchRepo.getBranchesRepo();
}

export const getBranch = async (id) => {
    const foundBranch = await findByBranchId(id);
    return foundBranch;
}

export const updateBranch = async (id, body) => {

    await findByBranchId(id);

    const updatedBranch = await branchRepo.updateBranchRepo(id, body);
    if (!updatedBranch) {
        throw new AppErrors(`Fail to update Branch`, 400)
    }
    return updatedBranch;
};


export const deleteBranch = async (id) => {

    await findByBranchId(id);
    await branchRepo.deleteBranchRepo(id);

}