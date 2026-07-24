// import mongoose from "mongoose";
import { User } from '../mongoose/schemas/user.mjs';
import * as userRepo from '../repositories/user.repository.mjs';
import AppErrors from '../utils/appErrors.mjs';
import { generateToken } from '../utils/jwt.util.mjs';
import { hashPassword } from '../utils/password.util.mjs';
import { findRoleById } from './role.service.mjs';


export const findUserById = async (id) => {

    const existId = await userRepo.findUserByIdRepo(id);

    if (!existId) {
        throw new AppErrors(`User ${id} is not found`, 404);
    }
    return existId;
}


export const findUserByName = async (name) => {

    const existId = await userRepo.findUserByNameRepo(name);

    if (!existId) {
        throw new AppErrors(`User ${name} is not found`, 404);
    }
    return existId;
}

export const createUser = async (userData) => {
    console.log("User Role ", userData.role)
    await findRoleById(userData.role);
    const password = await hashPassword(userData.password);
    const savedUser = await userRepo.createUserRepo({ ...userData, password: password });
    console.log("Saved User", savedUser);
    const token = generateToken({ id: savedUser._id })
    return {
        token: token,
        body: {
            id: savedUser._id,
            name: savedUser.name,
            role: savedUser.role
        }
    };
};

export const updateUser = async (id, body) => {
    await findUserById(id);
    const updatedUser = await userRepo.updateUserRepo(id, body);
    if (!updatedUser) {
        throw new AppErrors(`Fail to update user`, 400);

    }
    return updatedUser;
};

export const getAllUsers = async () => {
    return userRepo.getUsersRepo();
}

export const getUser = async (id) => {
    const user = await findUserById(id);
    return user;
}
// export const patchUser = async (id, body) => {
//     try {
//         const updatedUser = await User.updateOne(
//             { id: id },            // Filter
//             { $set: body } // Update operator
//         );
//         return updatedUser;
//     } catch (error) {
//         throw error;
//     }
// };

export const deleteUser = async (id) => {
    await findUserById(id);
    await userRepo.deleteUserRepo(id);
};
