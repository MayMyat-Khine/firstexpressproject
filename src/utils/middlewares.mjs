import { validationResult } from "express-validator";
import { User } from '../mongoose/schemas/user.mjs';
export const findByUserId = async (req, res, next) => {

    const { body, params: { id } } = req;
    // const parseId = parseInt(id);
    // if (isNaN(parseId)) return res.status(400).send({ msg: "Invalid ID,must be a number" });
    console.log("Parse id At user", id);

    const findUserIndex = await User.findOne({ id: id });
    console.log("Here is FindUserByIndex", findUserIndex);
    if (findUserIndex === null) return res.sendStatus(404);
    req.findUserIndex = findUserIndex;
    next();
}

export const updateByUserId = async (req, res, next) => {
    const { body, params: { id } } = req;

    const updatedUser = await User.findOneAndUpdate({ id: id }, body,);// runValidators: true { new: true }
    if (!updatedUser) return res.status(400).json({
        success: false,
        message: `User with id ${id} not found`
    })
    req.updatedUser = updatedUser;

    next();
};

export const updateSpecificByUserId = async (req, res, next) => {
    const { body, params: { id } } = req;
    const updatedUser = await User.updateOne(
        { id: id },               // Filter
        { $set: body } // Update operator
    );
    console.log("Updated User at Patch", updatedUser)
    if (updatedUser.matchedCount === 0)
        return res.status(400).json({
            success: false,
            message: `User with id ${id} not found`
        })

    req.updatedUser = updatedUser;
    next();

};