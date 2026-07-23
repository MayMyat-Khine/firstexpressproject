import { matchedData } from "express-validator";
import { createRole, updateRole } from "../services/role.service.mjs";

export async function createRoleController(req, res, next) {
    try {

        const validData = matchedData(req);
        const savedRole = await createRole(validData);
        return res.status(201).send({ success: true, body: savedRole });
    } catch (error) {
        next(error);
    }
}

export async function updateRoleController(req, res, next) {
    try {
        const validData = matchedData(req);
        const savedRole = await updateRole(req.params.id, validData);
        return res.status(201).send({ success: true, body: savedRole });
    } catch (error) {
        next(error);
    }
}