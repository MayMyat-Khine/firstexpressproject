import mongoose from "mongoose";
import { schemaTransform } from "../../utils/schemaTransform.mjs";

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

RoleSchema.set("toJSON", schemaTransform);

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