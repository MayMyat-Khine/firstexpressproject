import { matchedData } from 'express-validator';
import { Branch } from '../mongoose/schemas/branch.mjs';
import { createBranch, deleteBranch, updateBranch } from '../services/branch.service.mjs';

export async function branchCreateController(req, res) {
    try {

        const validData = matchedData(req);
        const savedBranch = await createBranch(validData);
        return res.status(200).send({ success: true, body: savedBranch });

    } catch (error) {
        return res.status(400).send(error);
    }
};

export async function branchGetAllController(req, res) {
    try {
        const branches = await Branch.find();
        res.json({ success: true, body: branches });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
};

export async function branchGetByIdController(req, res) {
    try {
        const { foundBranch } = req;
        return res.status(200).send({ success: true, body: foundBranch });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export async function branchUpdatedByIdController(req, res) {
    const { body, params: { id } } = req;
    try {
        const updatedBranch = await updateBranch(id, body);
        if (!updatedBranch) return res.status(400).json({
            message: `Branch with id ${id} not found`
        });
        return res.status(200).send({ message: "Successfully Updated", data: updatedBranch });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}



export async function branchDeleteByIdController(req, res) {
    try {
        const { id } = req.params;
        const deletedBranch = await deleteBranch(id);
        if (!deleteBranch) return res.status(400).json({
            success: false,
            message: `Branch with id ${id} not found`
        });

        return res.status(200).json({
            success: false,
            message: `Branch with id ${id} is successfully deleted with all data`
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
