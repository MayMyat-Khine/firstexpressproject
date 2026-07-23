import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'permission'
    }]
});

export const Role = mongoose.model('role', RoleSchema);

// {
//     "name": "Cashier",
//     "permissions": [
//         ORDER_CREATE,
//         SALE_CREATE
//     ]
// }
// {
//     "name": "Manager",
//     "permissions": [
//         ORDER_CREATE,
//         ORDER_CANCEL,
//         SALE_CREATE,
//         VOUCHER_RETURN,
//         EXPENSE_VIEW
//     ]
// }
// {
//     "name": "Admin",
//     "permissions": [
//         all permissions...
//     ]
// }