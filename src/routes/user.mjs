import { Router } from 'express';
import { User } from '../mongoose/schemas/user.mjs';
import { createUserValidationSchema, indexValidationSchema } from '../utils/validationSchema.mjs';
import { checkSchema, matchedData, validationResult } from 'express-validator';
import { findByUserId, updateByUserId, updateSpecificByUserId } from '../utils/middlewares.mjs';
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
    } catch (error) {
        console.log("here is error ", error);
        return res.status(400).json({
            success: false,
            message: error.message,
            errors: error.errors || null
        });
    }
});

router.get('/api/user', async (req, res) => {
    try {
        console.log("here is get user api");
        const newUser = await User.find();
        res.json(newUser);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});

router.get('/api/user/:id', checkSchema(indexValidationSchema), findByUserId, async (req, res) => {
    try {

        const { findUserIndex } = req;
        if (findUserIndex === null) return res.send(400);
        return res.status(200).send(findUserIndex);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});

router.put('/api/user/:id', updateByUserId, (req, res) => {
    try {
        const { updatedUser } = req;
        return res.status(200).send({ message: "Successfully Updated", data: updatedUser })
    } catch (error) {
        return res.status(400).send(error.message);
    }
})

router.patch('/api/user/:id', updateSpecificByUserId, (req, res) => {
    try {
        const { updatedUser } = req;
        return res.status(200).send({ message: "Successfully Updated", data: updatedUser })
    } catch (error) {
        return res.status(400).send(error.message);
    }
})

router.delete('/api/user/:id', async (req, res) => {
    try {
        const { body, params: { id } } = req;
        const deletedUser = await User.findOneAndDelete({ id: id });
        if (!deletedUser) return res.status(404).send("User Not Found")
        return res.status(200).send({ message: "Successfully Deleted", })
    } catch (error) {
        return res.status(400).send(error.message);
    }
})

export default router;