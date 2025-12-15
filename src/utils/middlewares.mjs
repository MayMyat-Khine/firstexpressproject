import { validationResult } from "express-validator";
import { User } from '../mongoose/schemas/user.mjs';
import { Product } from '../mongoose/schemas/product.mjs';
import { Stock } from "../mongoose/schemas/stock.mjs";

// True here middleware function
export const findByUserId = async (req, res, next) => {

    const { body, params: { id } } = req;
    // const parseId = parseInt(id);
    // if (isNaN(parseId)) return res.status(400).send({ msg: "Invalid ID,must be a number" });
    console.log("Parse id At user", id);

    const foundUser = await User.findOne({ id: id });
    console.log("Here is FindUserByIndex", foundUser);
    if (foundUser === null) return res.status(404).send({
        success: false,
        msg: `User with ID ${id} not found`
    });
    req.foundUser = foundUser;
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

export const updateStockByProductId = async (req, res, next) => {
    const { body, params: { id } } = req;
    const updatedStock = await Stock.replaceOne({ product_id: id }, body);
    if (!updatedStock) return res.status(400).json({
        success: false,
        message: `Product with ${id} not found`
    });
    req.updatedStock = updatedStock;
    next();
};

export const updateSpecificStockByProductId = async (req, res, next) => {
    const { body, params: { id } } = req;
    const updatedStock = await Stock.updateOne(
        { product_id: id },
        { $set: body }
    );
    if (updatedStock.matchedCount === 0) return res.status(400).json({
        success: false,
        message: `User with id ${id} is  not found`
    })
    req.updatedStock = updatedStock;
    next();
}

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