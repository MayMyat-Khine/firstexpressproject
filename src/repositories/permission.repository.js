import { Permission } from "../mongoose/schemas/permission.js";

export const getAllPermissionsRepo = async () => {
    return await Permission.find({});
};

export const getPermissionRepo = async (permissions) => {
    return await await Permission.find({
        _id: {
            $in: permissions
        }
    });
}