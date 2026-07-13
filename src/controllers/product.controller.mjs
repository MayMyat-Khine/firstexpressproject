import { Product } from "../mongoose/schemas/product.mjs";
import { matchedData } from "express-validator";
import { createProductWithBranchAndStock, deleteProdcutWithStock, productUpdateWithStock, productPatchWithStock } from "../services/product.service.mjs";

export async function productCreateController(req, res, next) {

    try {

        const validData = matchedData(req);
        const savedProduct = await createProductWithBranchAndStock(validData);
        return res.status(201).send({ success: true, body: savedProduct });
    } catch (error) {
        next(error);
    }
};

export async function productGetAllController(req, res) {
    try {
        console.log("here is get product api");
        const products = await Product.find();
        res.json({ success: true, body: products });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

export function productGetByIdController(req, res) {
    try {
        const { foundProduct } = req;
        return res.status(200).send({ success: true, body: foundProduct });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }

};

export async function productUpdateByIdController(req, res) {
    const { body, params: { id } } = req;
    try {
        // runValidators: true //check the schme validation
        //  { new: true } // give the updated obj if its false then will give the old data even the data is updated
        // const updatedProduct = await Product.findOneAndUpdate({ id: id }, body, { new: true, runValidators: true });
        console.log("here is product update data at product controller", body);
        const updatedProduct = await productUpdateWithStock(id, body);
        if (!updatedProduct) return res.status(400).json({
            success: false,
            message: `Product with id ${id} not found`
        })
        return res.status(200).send({ message: "Successfully Updated", data: updatedProduct })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

export async function productPatchByIdController(req, res) {
    try {
        const { body, params: { id } } = req;
        const updatedProduct = productPatchWithStock(id, body);
        if (updatedProduct.matchedCount === 0) return res.status(400).json({
            success: false,
            message: `Product with id ${id} is  not found`
        })
        return res.status(200).send({ message: "Successfully Updated", data: updatedProduct })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

export async function productDeleteByIdController(req, res) {
    try {
        const { id } = req.params;
        await deleteProdcutWithStock(id);
        return res.status(200).send({ message: "Successfully Deleted" })
    } catch (error) {
        return res.status(400).send(error.message);
    }
};