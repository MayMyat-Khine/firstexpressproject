import { Router } from 'express';
import { User } from '../mongoose/schemas/user.mjs';
import { createUserValidationSchema } from '../utils/validationSchema.mjs';
import { checkSchema, matchedData, validationResult } from 'express-validator';

const router = Router();

router.post('/api/user', checkSchema(createUserValidationSchema), async (req, res) => {
    console.log("Post User Create");
    const result = validationResult(req);

    if (!result.isEmpty()) return res.status(400).send(result.array());
    const data = matchedData(req);
    const newUser = User(data);
    try {
        const savedUser = await newUser.save();
        return res.send(newUser);
    } catch (e) {
        return res.status(400).send(e);
    }
});

router.get('/api/user', async (req, res) => {
    const newUser = await User.find();
    const result = res.json(newUser);
    console.log("New User", result);
    return res.send(result);
});