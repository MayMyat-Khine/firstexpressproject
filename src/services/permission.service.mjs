import * as permissionRepo from '../repositories/permission.repository.mjs';
import AppErrors from '../utils/appErrors.mjs';

export async function checkPermissions(permissions) {
    const foundPermissions = await permissionRepo.getPermissionRepo(permissions);

    if (permissions.length != foundPermissions.length) {
        throw new AppErrors(`One or more permissions are not found`, 404)
    };
}