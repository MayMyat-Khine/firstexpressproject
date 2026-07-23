import { Permission } from "../mongoose/schemas/permission.mjs";


export async function createPermissionController(req, res) {
    console.log("Create Permission ")
    await Permission.insertMany([
        // =======================
        // Product
        // =======================
        {
            code: "PRODUCT_VIEW",
            name: "View Products"
        },
        {
            code: "PRODUCT_CREATE",
            name: "Create Product"
        },
        {
            code: "PRODUCT_UPDATE",
            name: "Update Product"
        },
        {
            code: "PRODUCT_DELETE",
            name: "Delete Product"
        },

        // =======================
        // Branch
        // =======================
        {
            code: "BRANCH_VIEW",
            name: "View Branches"
        },
        {
            code: "BRANCH_CREATE",
            name: "Create Branch"
        },
        {
            code: "BRANCH_UPDATE",
            name: "Update Branch"
        },
        {
            code: "BRANCH_DELETE",
            name: "Delete Branch"
        },

        // =======================
        // Order
        // =======================
        {
            code: "ORDER_VIEW",
            name: "View Orders"
        },
        {
            code: "ORDER_CREATE",
            name: "Create Order"
        },
        {
            code: "ORDER_UPDATE",
            name: "Update Order"
        },
        {
            code: "ORDER_CANCEL",
            name: "Cancel Order"
        },

        // =======================
        // Stock
        // =======================
        {
            code: "STOCK_VIEW",
            name: "View Stock"
        },
        {
            code: "STOCK_CREATE",
            name: "Create Stock"
        },
        {
            code: "STOCK_UPDATE",
            name: "Update Stock"
        },
        {
            code: "STOCK_DELETE",
            name: "Delete Stock"
        },
        {
            code: "STOCK_ADJUST",
            name: "Adjust Stock"
        },

        // =======================
        // Branch Transfer
        // =======================
        {
            code: "TRANSFER_VIEW",
            name: "View Branch Transfers"
        },
        {
            code: "TRANSFER_CREATE",
            name: "Create Branch Transfer"
        },
        {
            code: "TRANSFER_APPROVE",
            name: "Approve Branch Transfer"
        },
        {
            code: "TRANSFER_RECEIVE",
            name: "Receive Branch Transfer"
        },
        {
            code: "TRANSFER_CANCEL",
            name: "Cancel Branch Transfer"
        }
    ]);

    console.log("After Create Permission");
    return res.status(200).send({ message: "Successfully Created Permission" })
}