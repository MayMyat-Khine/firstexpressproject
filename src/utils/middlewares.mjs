import { validationResult } from "express-validator";
import { User } from '../mongoose/schemas/user.mjs';
export const resolveByUserId = async (req, res, next) => {

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