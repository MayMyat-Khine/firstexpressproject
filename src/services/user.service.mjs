// import mongoose from "mongoose";
import { User } from '../mongoose/schemas/user.mjs';
import * as userRepo from '../repositories/user.repository.mjs';
import AppErrors from '../utils/appErrors.mjs';


export const findUserById = async (id) => {

    const existId = await userRepo.findUserById(id);

    if (!existId) {
        throw new AppErrors(`User ${id} is not found`, 404);
    }
    return existId;
}
export const createUser = async (userData) => {
    return userRepo.createUserRepo(userData);
};

export const updateUser = async (id, body) => {
    await findUserById(id);
    const updatedUser = await userRepo.updateUserRepo(id, body);
    if (!updatedUser) {
        throw AppErrors(`Fail to update user`, 400);

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
