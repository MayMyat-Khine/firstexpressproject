import { validationResult } from 'express-validator';

export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Here is validate log", errors);
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
