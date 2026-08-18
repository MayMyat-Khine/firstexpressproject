import { Product } from '../mongoose/schemas/product.mjs';
import mongoose from "mongoose";

export const getProductsOnBranchRepo = async (branchId) => {

    return await Product.find({
        "branch_id": branchId
        // new mongoose.Types.ObjectId(branchId) 
    }).populate({
        path: "branch_id",
        match: { id: branchId }
    })
        .populate({
            path: "stocks",
            match: { branch_id: branchId }
        });
    // .populate("branch_id").populate("stocks");
}

export const getProductsOnBranchByProductIdRepo = async (branchId, productIds) => {

    return await Product.find({ "branch_id": branchId, id: { $in: productIds }, }).populate("branch_id");
}



export const getProductOnBranchByProductIdRepo = async (branchId, productId) => {

    return await Product.findOne({ "branch_id": branchId, "id": productId }).populate("branch_id").populate({
        path: "stocks",
        match: { branch_id: branchId }
    });
}


export const getProductsRepo = async ({ page,
    limit,
    search }) => {

    const filter = {};

    if (search) {
        filter.product_name = {
            $regex: search, // pattern matching string
            $options: "i" // ignore case
        };
    }

    const total = await Product.countDocuments(filter);

    let query = Product.find(filter).populate("stocks");
    if (page && limit) {

        query = query
            .skip((page - 1) * limit)
            .limit(limit);
    }
    const products = await query;
    return {
        products, total
    }

}

export async function createProduct(id, branches, productData, session) {
    const newProduct = new Product({ ...productData, id: id, branch_id: branches });
    const savedProduct = await newProduct.save({ session });
    console.log("Saved Products", savedProduct)
    return savedProduct.populate({
        path: "branch_id",
        select: "id name"
    });

}

export async function findProductByIdRepo(id) {
    const foundProduct = await Product.findOne({ id: id }).populate("stocks");
    return foundProduct;
}

export async function productUpdateWithBranch(productId, branchData) {

    const updatedProduct = await Product.updateOne(
        { id: productId },  // match product
        { $addToSet: { branch_id: branchData } }             // add new branch
    );
    return updatedProduct;

}
export async function updateProduct(productId, productData, session) {
    const {
        branch_id,
        images,
        delete_image,
        ...otherFields
    } = productData;

    const update = {};

    // Normal fields
    if (Object.keys(otherFields).length > 0) {
        update.$set = otherFields;
    }

    // Add branches
    if (branch_id?.length) {
        update.$addToSet = {
            branch_id: {
                $each: branch_id
            }
        };
    }

    // Handle images
    if (images?.length || delete_image?.length) {
        const product = await Product.findOne(
            { id: productId },
            { images: 1 },
            { session }
        );

        if (!product) {
            throw new Error('Product not found');
        }

        let currentImages = product.images || [];

        // Remove deleted images
        if (delete_image?.length) {
            currentImages = currentImages.filter(
                image => !delete_image.includes(image)
            );
        }

        // Add new images
        if (images?.length) {
            currentImages = [
                ...currentImages,
                ...images
            ];
        }

        // Remove duplicates
        currentImages = [...new Set(currentImages)];

        update.$set = {
            ...(update.$set || {}),
            images: currentImages
        };
    }

    return Product.findOneAndUpdate(
        { id: productId },
        update,
        {
            new: true,
            runValidators: true,
            session
        }
    );
}

// export async function updateProduct(productId, productData, session) {
//     const update = {
//         $addToSet: {},
//         $pull: {},
//         $set: {}
//     };


//     if (productData.branch_id?.length) {
//         update.$addToSet.branch_id = {
//             $each: productData.branch_id
//         };

//     }
//     if (productData.images?.length > 0) {
//         update.$addToSet.images = {
//             $each: productData.images
//         };
//     }
//     if (productData.delete_image?.length > 0) {
//         update.$pull.images = {
//             $in: productData.delete_image
//         };
//     }

//     const { branch_id, images, delete_image, ...otherFields } = productData;

//     if (Object.keys(otherFields).length > 0) {
//         update.$set = otherFields;
//     }
//     return Product.findOneAndUpdate(
//         { id: productId },
//         update,
//         { new: true, runValidators: true, session });
// }

export async function deleteProduct(productId, session) {
    return await Product.findOneAndDelete({ id: productId }, { session });
}