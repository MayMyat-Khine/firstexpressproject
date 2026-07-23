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
            permissions: roleData
        },
        {
            new: true,

        }
    );
    return updatedRole;
}


