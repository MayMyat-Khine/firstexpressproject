import mongoose from "mongoose";
import { Branch } from "../mongoose/schemas/branch.mjs";

export const createBranch = async (branchData) => {
    try {
        const newBranch = new Branch(branchData);
        const savedBranch = newBranch.save();
        return savedBranch;
    } catch (error) {
        throw error;
    }
};

export const updateBranch = async (id, body) => {
    try {
        const updatedBranch = await Branch.findOneAndUpdate(
            { id: id },
            body, { new: true, runValidators: true });
        return updatedBranch;
    } catch (error) {
        throw error;
    }
};


export const deleteBranch = async (id) => {
    try {
        const deletedBranch = await Branch.findOneAndDelete({ id: id });
        return deleteBranch;
    } catch (error) {
        throw error;
    }
}