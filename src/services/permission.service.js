import * as permissionRepo from '../repositories/permission.repository.js';
import AppErrors from '../utils/appErrors.js';

export async function getAllPermissionsService() {
    return await permissionRepo.getAllPermissionsRepo();
}

export async function checkPermissions(permissions) {
    const foundPermissions = await permissionRepo.getPermissionRepo(permissions);

    if (permissions.length != foundPermissions.length) {
        throw new AppErrors(`One or more permissions are not found`, 404)
    };
}