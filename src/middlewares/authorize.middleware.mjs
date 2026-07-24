import AppErrors from "../utils/appErrors.mjs";

export const authorizeMiddleware = (requiredPermissions) => {

    return (req, res, next) => {
        console.log("req.role", req.user)
        const userPermissions = req.user.role.permissions.map(
            p => p.code
        );
        console.log("Permission", userPermissions)
        console.log("Requird Permission", requiredPermissions)
        const hasPermission = requiredPermissions.every(permission =>
            userPermissions.includes(permission)
        );
        console.log("authorizeMiddleware has Permission")
        if (!hasPermission) {
            throw new AppErrors("Permission denied.", 403)
        }

        next();
    };

};