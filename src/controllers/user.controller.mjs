
import { matchedData } from "express-validator";
import { User } from "../mongoose/schemas/user.mjs";
import { createUser, deleteUser, patchUser, updateUser } from "../services/user.service.mjs";

export async function userCreateController(req, res) {
    const data = matchedData(req);

    try {
        const savedUser = await createUser(data);
        return res.status(201).send({ success: true, body: savedUser });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export async function userGetAllController(req, res) {
    try {
        console.log("here is get user api");
        const users = await User.find();
        console.log("Users ", users)
        res.json({ success: true, body: users });
    } catch (error) {
        console.log("Error in getting users ", error);
        return res.status(400).json({
            message: error.message
        });
    }
};

export function userGetByIdController(req, res) {
    try {
        const { foundUser } = req;
        return res.status(200).send({ success: true, body: foundUser });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }

}

export async function userUpdateByIdController(req, res) {
    const { body, params: { id } } = req;
    try {

        const updatedUser = await updateUser(id, body);
        if (!updatedUser) return res.status(400).json({
            success: false,
            message: `User with id ${id} not found`
        })
        return res.status(200).send({ message: "Successfully Updated", data: updatedUser })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export async function userPatchByIdController(req, res) {
    try {
        const { body, params: { id } } = req;
        const updatedUser = await patchUser(id, body);
        console.log("Updated User at Patch", updatedUser)
        if (updatedUser.matchedCount === 0)
            return res.status(400).json({
                success: false,
                message: `User with id ${id} is  not found`
            })
        return res.status(200).send({ message: "Successfully Updated", data: updatedUser })
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

export async function userDeleteByIdController(req, res) {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUser(id);
        if (!deletedUser) return res.status(404).json({
            success: false,
            message: `User with id ${id} not found`
        });
        return res.status(200).json({
            success: true,
            message: `User with id ${id} successfully deleted`
        });
    } catch (error) {
        return res.status(400).send(error.message);
    }
}