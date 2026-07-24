import { User } from '../mongoose/schemas/user.mjs';

export const getUsersRepo = async () => {
    return await User.find();
    // here to filter(isActive is true)
}

export async function createUserRepo(user) {
    const newUser = new User(user);
    const savedUser = await newUser.save();
    return savedUser;
}



export async function findUserByIdRepo(id) {

    const foundUser = await User.findOne({ _id: id }).populate({
        path: "role", populate: {
            path: "permissions",
            select: "code -_id"
        }
    });

    return foundUser;
}

export async function findUserByNameRepo(name) {

    const foundUser = await User.findOne({ name: name }).populate({
        path: "role", populate: {
            path: "permissions",
            select: "code -_id"
        }
    });

    return foundUser;
}

export async function updateUserRepo(id, body) {
    // runValidators: true //check the schme validation
    //  { new: true } // give the updated obj if its false then will give the old data even the data is updated
    const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        body,
        { new: true, runValidators: true });
    return updatedUser;
}

export const deleteUserRepo = async (id) => {
    const deletedUser = await User.findOneAndDelete({ id: id });
    return deletedUser;
}
