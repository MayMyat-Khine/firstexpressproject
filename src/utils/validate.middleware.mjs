import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Here is validate log", errors);
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validatePatchBody = (req, res, next) => {

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Request body cannot be empty"
        });
    }

    next();
};