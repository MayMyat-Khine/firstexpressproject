import { matchedData } from 'express-validator';
import { Branch } from '../mongoose/schemas/branch.mjs';
import { createBranch, deleteBranch, updateBranch, getAllBranches, getBranch } from '../services/branch.service.mjs';

export async function branchCreateController(req, res, next) {
    try {
        const validData = matchedData(req);
        const savedBranch = await createBranch(validData);
        return res.status(200).send({ success: true, body: savedBranch });

    } catch (error) {
        next(error);
    }
};

export async function branchGetAllController(req, res, next) {
    try {
        const branches = await getAllBranches();
        return res.json({ success: true, body: branches });
    } catch (error) {
        next(error);
    }
};

export async function branchGetByIdController(req, res, next) {
    try {
        const { params: { id } } = req;
        const foundBranch = await getBranch(id);
        return res.status(200).send({ success: true, body: foundBranch });
    } catch (error) {
        next(error);
    }
}

export async function branchUpdateByIdController(req, res, next) {
    const { body, params: { id } } = req;
    try {
        const updatedBranch = await updateBranch(id, body);
        return res.status(200).send({ message: "Successfully Updated", data: updatedBranch });
    } catch (error) {
        next(error);
    }
}



export async function branchDeleteController(req, res, next) {
    try {
        const { id } = req.params;
        await deleteBranch(id);
        return res.status(200).json({
            success: false,
            message: `Branch with id ${id} is successfully deleted with all data`
        });
    } catch (error) {
        next(error);
    }
}
