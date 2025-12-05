import { validationResult } from "express-validator";
import { User } from '../mongoose/schemas/user.mjs';
import { Product } from '../mongoose/schemas/product.mjs';
import { Stock } from "../mongoose/schemas/stock.mjs";
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

export const findByProductId = async (req, res, next) => {
    const { body, params: { id } } = req;

    console.log("Product ID", id);
    const foundProduct = await Product.findOne({ id: id })
    console.log("Found Product ", foundProduct);

    req.foundProduct = foundProduct;
    req.id = id;
    next();
}

export const findProductFromStock = async (req, res, next) => {
    const { params: { id } } = req;
    console.log("Here is product id", id);
    const foundProduct = await Stock.findOne({ product_id: id });
    console.log("here is product from stock db", foundProduct);
    req.foundProductFromStock = foundProduct;
    next();
}


export const updateByUserId = async (req, res, next) => {
    const { body, params: { id } } = req;
    // runValidators: true //check the schme validation
    //  { new: true } // give the updated obj if its false then will give the old data even the data is updated
    const updatedUser = await User.findOneAndUpdate({ id: id }, body, { new: true, runValidators: true });
    if (!updatedUser) return res.status(400).json({
        success: false,
        message: `User with id ${id} not found`
    })
    req.updatedUser = updatedUser;

    next();
};

export const updateByProductId = async (req, res, next) => {
    const { body, params: { id } } = req;
    const updatedProduct = await Product.findOneAndUpdate({ id: id }, body, { new: true, runValidatiors: true });
    if (!updatedProduct) return res.status(400).json({
        success: false,
        message: `Product with ${id} not found`
    });
    req.updatedProduct = updatedProduct;
    next();
}

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
            message: `User with id ${id} is  not found`
        })

    req.updatedUser = updatedUser;
    next();

};

export const updateSpecificByProductId = async (req, res, next) => {
    const { body, params: { id } } = req;
    const updatedProuduct = await Product.updateOne(
        { id: id },
        { $set: body }
    );
    if (updatedProuduct.matchedCount === 0) return res.status(400).json({
        success: false,
        message: `Product with id ${id} is not found`
    });

    req.updatedProduct = updatedProuduct;
    next();
}