import AppErrors from "../utils/appErrors.mjs";

export const authorizeMiddleware = (requiredPermissions) => {

    return (req, res, next) => {

        const userPermissions = req.user.role.permissions.map(
            p => p.code
        );

        const hasPermission = requiredPermissions.every(permission =>
            userPermissions.includes(permission)
        );

        if (!hasPermission) {
            throw new AppErrors("Permission denied.", 403)
        }
        console.log("authorizeMiddleware")

        next();
    };

};