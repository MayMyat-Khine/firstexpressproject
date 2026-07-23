import { Permission } from "../mongoose/schemas/permission.mjs";

export const getPermissionRepo = async (permissions) => {
    return await await Permission.find({
        _id: {
            $in: permissions
        }
    });
}