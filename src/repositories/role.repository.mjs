import { Role } from "../mongoose/schemas/role.mjs";

export const createRoleRepo = async (roleData) => {
    const newRole = new Role(roleData);
    const savedRole = await newRole.save();
    return savedRole;
}



export const updateRoleRepo = async (roleId, roleData) => {
    const updatedRole = await Role.findByIdAndUpdate(
        roleId,
        {
            permissions: roleDataç
        },
        {
            new: true,

        }
    );
    return updatedRole;
}

export const findRoleByIdRepo = async (roleId) => {
    return await Role.findOne({
        _id: roleId
    })
}


export const getRolesRepo = async () => {
    return await Role.find();
}