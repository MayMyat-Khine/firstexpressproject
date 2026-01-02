import { validationResult } from "express-validator";
import { User } from '../mongoose/schemas/user.mjs';
import { Product } from '../mongoose/schemas/product.mjs';
import { Stock } from "../mongoose/schemas/stock.mjs";
import { Order } from "../mongoose/schemas/order.mjs";

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

// find by id using at endPoint with params
export const findByProductId = async (req, res, next) => {
    const { body, params: { id } } = req;

    console.log("Product ID", id);
    const foundProduct = await Product.findOne({ id: id })
    console.log("Found Product ", foundProduct);
    if (foundProduct === null) return res.status(404).send({
        success: false,
        msg: `Product with ID ${id} not found`
    });
    req.foundProduct = foundProduct;
    req.id = id;
    next();
}

export const findStockByProductId = async (req, res, next) => {
    const { params: { id } } = req;
    console.log("Here is product id", id);
    const foundProduct = await Stock.findOne({ product_id: id });
    console.log("here is product from stock db", foundProduct);
    if (foundProduct === null) return res.status(404).send({
        success: false,
        msg: `Product with ID ${id} not found`
    });
    req.foundProductFromStock = foundProduct;
    next();
}


export const findByOrderId = async (req, res, next) => {
    const { params: { id } } = req;

    const foundOrder = await Order.findOne({ order_id: id });
    if (foundOrder === null) return res.status(404).send({
        success: false,
        msg: `Order with ID ${id} not found`
    });
    req.foundOrder = foundOrder;
    next();
};



