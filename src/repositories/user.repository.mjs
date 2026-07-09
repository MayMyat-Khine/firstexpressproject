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



export async function findUserById(id) {
    const foundUser = await User.findOne({ id: id });
    return foundUser;
}

export async function updateUserRepo(id, body) {
    // runValidators: true //check the schme validation
    //  { new: true } // give the updated obj if its false then will give the old data even the data is updated
    const updatedUser = await User.findOneAndUpdate(
        { id: id },
        body,
        { new: true, runValidators: true });
    return updatedUser;
}