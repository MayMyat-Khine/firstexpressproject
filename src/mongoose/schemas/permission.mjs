import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    name: String,
    description: String
});

export const Permission = mongoose.model('permission', PermissionSchema);
// [
//     {
//         "code": "ORDER_CREATE",
//         "name": "Create Order"
//     },
//     {
//         "code": "ORDER_CANCEL",
//         "name": "Cancel Order"
//     },
//     {
//         "code": "SALE_CREATE",
//         "name": "Sell Product"
//     },
//     {
//         "code": "VOUCHER_RETURN",
//         "name": "Return Voucher"
//     },
//     {
//         "code": "EXPENSE_VIEW",
//         "name": "View Expenses"
//     },
//     {
//         "code": "USER_MANAGE",
//         "name": "Manage Users"
//     }
// ]