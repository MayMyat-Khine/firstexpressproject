import mongoose from "mongoose";

export const getBranches = async (branchIds) => {
    // get branches from repo layer to check both transfer and receive branches are valid
    try {


    } catch (error) {
        throw error;
    }
}

export const getProductsOnBranch = async (branchId, products) => {
    // get product with branch id to valid all products are on that branch
    try { } catch (error) {
        throw error;
    }
}

export const getUser = async (userId) => {
    // get user id to valid for createdBy
    try { } catch (error) {
        throw error;
    }
}

//if all validation are valid , then create tranfer products 