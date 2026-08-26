import { body, validationResult } from "express-validator";

export const validateCreateAccount = [
    body("phone_number")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required")
        .isNumeric()
        .isLength({ min: 9, max: 11 })
        .withMessage("Phone number must be between 9 and 11 characters"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: errors.array()[0].msg,
                errors: errors.array(),
            });
        }

        next();
    },
];