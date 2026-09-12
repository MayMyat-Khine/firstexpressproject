import { Product } from "../mongoose/schemas/product.js";
import { matchedData } from "express-validator";
import { getProducts, findProductById, getProductsByBranch, createProductWithBranchAndStock, deleteProdcutWithStock, productUpdateWithStock, getProductByProductIdAndBranch } from "../services/product.service.js";
import { uploadToCloudinary } from "../middlewares/cloudinary.middleware.js";

export async function productCreateController(req, res, next) {

    try {
        console.log("Product Creaet Controllerg")
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
        console.log("Valid Product Data", validData)

        const savedProduct = await createProductWithBranchAndStock(data);
        return res.status(201).send({ success: true, body: savedProduct });
    } catch (error) {
        next(error);
    }
};

export async function productGetAllController(req, res, next) {
    try {
        var validateData = matchedData(req);
        const { products, pagination } = await getProducts(validateData);
        res.json({ success: true, body: products, pagination });
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
        console.log("Branch id", req.params.id);
        const branchId = req.params.id;
        const validated = matchedData(req);
        const page = validated.page ?? req.query.page;
        const limit = validated.limit ?? req.query.limit;
        const search = validated.search ?? req.query.search;
        const categoryId = validated.categoryId ?? req.query.categoryId;
        const brandId = validated.brandId ?? req.query.brandId;
        const { products, pagination } = await getProductsByBranch({ branchId, page, limit, search, categoryId, brandId });
        console.log(JSON.stringify(products, null, 2));
        return res.status(200).send({ success: true, body: products, pagination });
    } catch (error) {
        next(error);
    }
}

export async function productGetByBranchController(req, res, next) {
    try {
        console.log("product controller by customer called")
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

        console.log("here is product update controller")
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