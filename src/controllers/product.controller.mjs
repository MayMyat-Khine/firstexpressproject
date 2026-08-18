import { Product } from "../mongoose/schemas/product.mjs";
import { matchedData } from "express-validator";
import { getProducts, findProductById, getProductsByBranch, createProductWithBranchAndStock, deleteProdcutWithStock, productUpdateWithStock, getProductByProductIdAndBranch } from "../services/product.service.mjs";
import { uploadToCloudinary } from "../middlewares/cloudinary.middleware.mjs";

export async function productCreateController(req, res, next) {

    try {
        console.log("Product Creaet Controller")
        const validData = matchedData(req);

        const imageUrls = [];

        for (const file of req.files ?? []) {
            const result = await uploadToCloudinary(
                file.buffer,
                "retail/products"
            );

            imageUrls.push(result.secure_url);
            console.log("Image url", result.secure_url)
        }

        const data = {
            ...validData,
            images: imageUrls//req.files?.map(file => file?.path) || []
        }

        const savedProduct = await createProductWithBranchAndStock(data);
        return res.status(201).send({ success: true, body: savedProduct });
    } catch (error) {
        next(error);
    }
};

export async function productGetAllController(req, res, next) {
    try {
        var validateData = matchedData(req);
        const { products, total } = await getProducts(validateData);
        res.json({ success: true, body: products, total: total });
    } catch (error) {
        next(error);
    }
};

export async function productGetByIdController(req, res, next) {
    try {
        const foundProduct = await findProductById(req.params.id);
        return res.status(200).send({ success: true, body: foundProduct });
    } catch (error) {
        next(error);
    }

};

export async function productsGetByBranchController(req, res, next) {
    try {
        const products = await getProductsByBranch(req.params.id);
        console.log(JSON.stringify(products, null, 2));
        return res.status(200).send({ success: true, body: products, count: products.length });
    } catch (error) {
        next(error);
    }
}

export async function productGetByBranchController(req, res, next) {
    try {
        const product = await getProductByProductIdAndBranch(req.params.bid, req.params.pid);
        console.log("found product", product)
        return res.status(200).send({ success: true, body: product });
    } catch (error) {
        next(error);
    }
}


// export async function productUpdateByIdController(req, res) {
//     const { body, params: { id } } = req;
//     try {
//         // runValidators: true //check the schme validation
//         //  { new: true } // give the updated obj if its false then will give the old data even the data is updated
//         // const updatedProduct = await Product.findOneAndUpdate({ id: id }, body, { new: true, runValidators: true });
//         console.log("here is product update data at product controller", body);
//         const updatedProduct = await productUpdateWithStock(id, body);
//         if (!updatedProduct) return res.status(400).json({
//             success: false,
//             message: `Product with id ${id} not found`
//         })
//         return res.status(200).send({ message: "Successfully Updated", data: updatedProduct })
//     } catch (error) {
//         return res.status(400).json({
//             message: error.message
//         });
//     }
// };

export async function productUpdateByIdController(req, res, next) {
    try {

        const imageUrls = [];

        for (const file of req.files ?? []) {
            const result = await uploadToCloudinary(
                file.buffer,
                "retail/products"
            );

            imageUrls.push(result.secure_url);
        }

        const { body, params: { id } } = req;
        const data = {
            ...body,
            images: imageUrls//req.files?.map(file => file?.path) || []
        }
        const updatedProduct = await productUpdateWithStock(id, data);

        return res.status(200).send({ success: true, body: updatedProduct })
    } catch (error) {
        next(error);
    }
}

export async function productDeleteByIdController(req, res, next) {
    try {
        const { id } = req.params;
        await deleteProdcutWithStock(id);
        return res.status(200).send({ success: true, message: "Successfully Deleted" })
    } catch (error) {
        next(error);
    }
};

// for remove branch : should have new api as it need to confirm to transfer or make 0 to it's stock at that branch
// so normal updateProduct api be able to update productname,code, description and ONLY add more branch