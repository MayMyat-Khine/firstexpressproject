
export const authorize = (...requiredPermissions) => {

    return (req, res, next) => {

        const userPermissions = req.user.role.permissions.map(
            p => p.code
        );

        const hasPermission = requiredPermissions.every(permission =>
            userPermissions.includes(permission)
        );

        if (!hasPermission) {
            return res.status(403).json({
                message: "Permission denied."
            });
        }

        next();
    };

};