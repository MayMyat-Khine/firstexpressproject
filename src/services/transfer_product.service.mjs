import mongoose from "mongoose";
import { getCachedBranchIdsRepo } from '../repositories/branch.repository.mjs';
import { getUsersRepo } from "../repositories/user.repository.mjs";
import { getProductsOnBranchRepo } from "../repositories/product.repostiory.mjs";
import AppErrors from "../utils/appErrors.mjs";
import { createTransferProductsRepo } from "../repositories/transfer_product.repository.mjs";

const validateBranches = async (branchIds) => {
    try {
        const branches = await getCachedBranchIdsRepo();
        //here lets check here if there is no branches data
        if (branches.length === 0) {//branches === null || branches === undefined
            throw new AppErrors("BRANCHES NOT FOUND", 404);
        }
        const xValid = [...branchIds].every(id => branches.includes(id));
        if (!xValid) {
            throw new AppErrors("One of the Branch ID is not found", 404);
        }
        return true;
    } catch (error) {
        throw error;
    }
}

const validateProductsOnBranch = async (branchId, productIds) => {
    try {
        const products = await getProductsOnBranchRepo(branchId);
        if (products.length === 0) {
            throw new AppErrors("PRODUCTS NOT FOUND", 404);
        }
        const xValid = [...productIds].every(pid => products.map(p => p.id).includes(pid));
        if (!xValid) {
            throw new AppErrors("One of the Products is not found", 404);
        }
        return true;
    } catch (error) {
        throw error;
    }
}

const validateUser = async (userId) => {
    try {
        const users = await getUsersRepo();
        if (users.length === 0) {
            throw new AppErrors("USERS NOT FOUND", 404);
        }
        const xValid = users.map(user => user.id).includes(userId);
        if (!xValid) {
            throw new AppErrors("User is not found", 404);
        }
        return true;
    } catch (error) {
        throw error;
    }
}

export const createTransferProductsService = async (createTransferProuctsData) => {
    console.log("createTransferProuctsData ", createTransferProuctsData);
    try {
        const xValidUser = await validateUser(createTransferProuctsData['created_by']);
        const xValidBranch = await validateBranches([createTransferProuctsData['sender_branch_id'], createTransferProuctsData['receiver_branch_id']]);
        const xValidProducts = await validateProductsOnBranch(createTransferProuctsData['receiver_branch_id'], createTransferProuctsData['products']);
        if (xValidUser && xValidBranch && xValidProducts) {
            const savedData = await createTransferProductsRepo(createTransferProuctsData);
            return savedData;
        }
    } catch (error) {
        throw new AppErrors(error.message, error.statusCode);
    }
}
//if all validation are valid , then create tranfer products 