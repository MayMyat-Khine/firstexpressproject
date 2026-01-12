import { User } from '../mongoose/schemas/user.mjs';

export const getUsersRepo = async () => {
    return await User.find();

}

// ask here for get all data , can controller directly call repostiory or find() just use in controller or call repostiory via service from controller