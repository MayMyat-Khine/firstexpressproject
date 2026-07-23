import { check } from 'express-validator';
import * as roleRepo from '../repositories/role.repository.mjs';
import { checkPermissions } from './permission.service.mjs';

export async function createRole(roleData) {

    await checkPermissions(roleData.permissions)
    return roleRepo.createRoleRepo(roleData);
}

export async function updateRole(roleId, roleData) {
    await checkPermissions(roleData.permissions)
    return await roleRepo.updateRoleRepo(roleId, roleData.permissions);
}