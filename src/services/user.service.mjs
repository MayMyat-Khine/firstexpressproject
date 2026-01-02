import mongoose from "mongoose";
import { User } from '../mongoose/schemas/user.mjs';

export const createUser = async (userData) => {
    console.log("here is user service");

    try {
        const newUser = new User(userData);
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        console.error("Error creating user at service", error);
        throw error;
    }
};

export const updateUser = async (id, body) => {
    try {
        // runValidators: true //check the schme validation
        //  { new: true } // give the updated obj if its false then will give the old data even the data is updated
        const updatedUser = await User.findOneAndUpdate({ id: id }, body, { new: true, runValidators: true });
        return updateUser;
    } catch (error) {
        throw error;
    }
};

export const patchUser = async (id, body) => {
    try {
        const updatedUser = await User.updateOne(
            { id: id },            // Filter
            { $set: body } // Update operator
        );
        return updateUser;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const deletedUser = await User.findOneAndDelete({ id: id });
        return deleteUser;
    }
    catch (error) {
        throw error;
    }
};

export const findUserById = async (id) => {
    try {
        const foundUser = await User.findOne({ id: id });
        return foundUser;
    } catch (error) {
        throw error;
    }
}