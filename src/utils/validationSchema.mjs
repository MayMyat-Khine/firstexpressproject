// import { getCachedBranchIdsRepo } from '../repositories/branch.repository.mjs';

export const registerValidaionSchema = {
    phone_number: {
        in: ["body"],
        isString: {
            errorMessage: "Phone Number Must be String"
        },
        notEmpty: {
            errorMessage: "Phone Number Must not be Empty"
        },
    },
    password: {
        in: ["body"],
        isString: {
            errorMessage: "Password Must be String"
        },
        notEmpty: {
            errorMessage: "Password not be Empty"
        },
    }
}

export const createCustomerValidationScheme = {
    name: {
        in: ["body"],
        isString: {
            errorMessage: "Name Must be String"
        },
        notEmpty: {
            errorMessage: "Name Must not be Empty"
        },

    },
    display_name: {
        in: ["body"],
        isString: {
            errorMessage: "Display Name Must be String"
        },
        notEmpty: {
            errorMessage: "Display Name Must not be Empty"
        },

    },
    phone_number: {
        in: ["body"],
        isString: {
            errorMessage: "Phone Must be String"
        },
        notEmpty: {
            errorMessage: "Phone not be Empty"
        },

    },
    password: {
        in: ["body"],
        isString: {
            errorMessage: "Password Must be String"
        },
        notEmpty: {
            errorMessage: "Password not be Empty"
        },
        isLength: {
            options: {
                min: 6
            },
            errorMessage: "Password must be at least 6 characters"
        }

    },
}


export const createUserValidationSchema = {
    id: {
        in: ["body"],
        isString: {
            errorMessage: "ID Must be String"
        },
        notEmpty: {
            errorMessage: "Must not be Empty"
        },

    },
    display_name: {
        in: ["body"],
        isString: {
            errorMessage: "DisplayName Must be String"
        },
        notEmpty: {
            errorMessage: "Must not be Empty"
        },

    },
    name: {
        in: ["body"],
        isString: {
            errorMessage: "Name Must be String"
        },
        notEmpty: {
            errorMessage: "Name Must not be Empty"
        },

    },
    password: {
        in: ["body"],

        notEmpty: {
            errorMessage: "Password must not be Empty"
        },
        isLength: {
            options: {
                min: 6
            },
            errorMessage: "Password must be at least 6 characters"
        }
    },

};

export const updateUserValidationSchema = {

    name: {
        in: ["body"],
        optional: true,
        isString: {
            errorMessage: "Name must be string"
        }
    },

    display_name: {
        in: ["body"],
        optional: true,
        isString: {
            errorMessage: "Display name must be string"
        }
    },

    password: {
        in: ["body"],
        optional: true,
        isLength: {
            options: {
                min: 6
            },
            errorMessage: "Password must be at least 6 characters"
        }
    }

};

export const indexValidationSchema = {

    id: {
        in: ["params"],
        notEmpty: {
            errorMessage: "ID must not be empty"
        },
        isString: {

            errorMessage: "ID must be a String"
        },
    }
};

export const createBranchValidationSchema = {
    id: {
        in: ['body'],
        isString: {
            errorMessage: "ID must be a String"
        }, notEmpty: { errorMessage: "ID must not be empty" }
    },
    name: {
        in: ['body'],
        isString: {
            errorMessage: "Name must be a String"
        }, notEmpty: { errorMessage: "Name must not be empty" }
    },
    address: {
        in: ['body'],
        isString: {
            errorMessage: "Address must be a String"
        }, notEmpty: { errorMessage: "Address must not be empty" }
    },
    contact: {
        in: ['body'],
        optional: true,
    }
}

export const updateBranchValidationSchema = {
    name: {
        in: ['body'],
        optional: true,
        isString: {
            errorMessage: "Name must be a String"
        }, notEmpty: { errorMessage: "Name must not be empty" }
    },
    address: {
        in: ['body'],
        optional: true,
        isString: {
            errorMessage: "Address must be a String"
        }, notEmpty: { errorMessage: "Address must not be empty" }
    },
    contact: {
        in: ['body'],
        optional: true,
    }
}

export const createProductValidationSchema = {
    // id: {
    //     in: ['body'],
    //     isString: {
    //         errorMessage: "ID must be a String"
    //     },
    //     notEmpty: {
    //         errorMessage: "ID Must not be Empty"
    //     }
    // },
    product_name: {
        in: ['body'],
        isString: {
            errorMessage: "Product Name must be a String"
        },
        notEmpty: {
            errorMessage: "Product Name Must not be Empty"
        }
    },
    branch_id: {
        in: ['body'],
        isArray: {
            options: { min: 1 },
            errorMessage: "Branch ID must be an array "

        },
        notEmpty: {
            errorMessage: "Branch ID Must not be Empty"
        },
        // custom: {
        //     options: async (value) => {
        //         const branchIds = await getCachedBranchIdsRepo();
        //         console.log('Branches Ids ', branchIds);
        //         const allExist = value.every(b => branchIds.includes(b));
        //         if (!allExist) {
        //             throw new Error("Branch is not valid");
        //         }
        //         return true;
        //     }
        // }
    },

    description: {
        in: ['body'],
        isString: {
            errorMessage: "Description must be a String"
        },
        optional: true
    },
    code: {
        in: ['body'],
        isString: {
            errorMessage: "Code must be a String"
        },
        notEmpty: { errorMessage: "Code must not be empty" }
    },
    price: {
        in: ["body"],
        isNaN: { errorMessage: "Price must be a number" },
        notEmpty: { errorMessage: "Price must not be Empty" },

    }
}

export const updateProductValidationSchema = {
    // id: {
    //     in: ['body'],
    //     isString: {
    //         errorMessage: "ID must be a String"
    //     },
    //     notEmpty: {
    //         errorMessage: "ID Must not be Empty"
    //     }
    // },
    product_name: {
        in: ['body'],
        isString: {
            errorMessage: "Product Name must be a String"
        },
        notEmpty: {
            errorMessage: "Product Name Must not be Empty"
        },
        optional: true
    },
    branch_id: {
        in: ['body'],
        isArray: {
            options: { min: 1 },
            errorMessage: "Branch ID must be an array "

        },
        notEmpty: {
            errorMessage: "Branch ID Must not be Empty"
        },
        optional: true
    },

    description: {
        in: ['body'],
        isString: {
            errorMessage: "Description must be a String"
        },
        optional: true
    },
    code: {
        in: ['body'],
        isString: {
            errorMessage: "Code must be a String"
        },
        notEmpty: { errorMessage: "Code must not be empty" },
        optional: true
    },
    price: {
        in: ["body"],
        isNaN: { errorMessage: "Price must be a number" },
        notEmpty: { errorMessage: "Price must not be Empty" },
        optional: true
    }
}

// export const createStockValidationSchema = {
//     // id: {
//     //     in: ["body"],
//     //     isString: { errorMessage: "ID must be string" },
//     //     notEmpty: { errorMessage: "ID must not be Empty" }
//     // },
//     proidduct_id: {
//         in: ["body"],
//         isString: { errorMessage: "Product ID must be string" },
//         notEmpty: { errorMessage: "Product ID must not be Empty" }
//     },
//     branch_id: {
//         in: ["body"],
//         isString: { errorMessage: "branch id must be string" },
//         notEmpty: { errorMessage: "branch id must not be Empty" }
//     },
//     stock: {
//         in: ["body"],
//         isNaN: { errorMessage: "Stock must be a number" },
//         notEmpty: { errorMessage: "Stock must not be Empty" }
//     },
//     low_stock: {
//         in: ["body"],
//         isNaN: { errorMessage: "Low Stock must be a number" },
//         notEmpty: { errorMessage: "Low Stock must not be Empty" }
//     },

// }

export const updateStockValidationSchema = {
    // id: {
    //     in: ["body"],
    //     isString: { errorMessage: "ID must be string" },
    //     notEmpty: { errorMessage: "ID must not be Empty" }
    // },
    stock: {
        in: ["body"],
        isNaN: { errorMessage: "Stock must be a number" },
        notEmpty: { errorMessage: "Stock must not be Empty" },
        optional: true
    },
    low_stock: {
        in: ["body"],
        isNaN: { errorMessage: "Low Stock must be a number" },
        notEmpty: { errorMessage: "Low Stock must not be Empty" },
        optional: true
    },

}

export const createOrderValidationSchema = {

    branch_id: {
        in: ["body"],
        isString: { errorMessage: "Merchant ID must be string" },
        notEmpty: { errorMessage: "Merchant ID must not be Empty" }
    },
    customer_id: {
        in: ["body"],
        isString: { errorMessage: "Customer ID must be string" },
        notEmpty: { errorMessage: "Customer ID must not be Empty" }
    },
    payment_method: {
        in: ["body"],
        isString: { errorMessage: "Payment Method must be string" },
        notEmpty: { errorMessage: "Payment Method must not be Empty" }
    },
    purchase_products: {
        in: ["body"],
        isArray: {
            options: { min: 1 },
            errorMessage: "Products must be an array with at least one item"

        },
        notEmpty: { errorMessage: "Products must not be Empty" }
    },
    // * means every object in the array
    // Each object must have product_id
    "purchase_products.*.id": {
        in: ["body"],
        isString: { errorMessage: "Product ID must be string" },
        notEmpty: { errorMessage: "Product ID must not be empty" }
    },

    "purchase_products.*.quantity": {
        in: ["body"],
        isInt: {
            options: { gt: 0 },
            errorMessage: "Quantity must be greater than 0"
        }
    },
    notes: {
        in: ["body"],
    },

};
export const updateOrderValidationSchema = {

    notes: {
        in: ["body"],
        optional: true
    },
    status: {
        in: ["body"],
        isString: { errorMessage: "Status must be string" },
        notEmpty: { errorMessage: "Status must not be Empty" },
        optional: true
    }
};

// === Current only update the Status and Notes === //
// export const updateOrderValidationSchema = {
//     original_products: {
//         in: ["body"],
//         optional: true,
//         isArray: {
//             options: { min: 1 },
//             errorMessage: "Products must be an array "

//         },

//     },
//     new_products: {
//         in: ["body"],
//         optional: true,
//         isArray: {
//             options: { min: 1 },
//             errorMessage: "New Products must be an array"

//         },
//     },
//     delete_products: {
//         in: ["body"],
//         optional: true,
//         isArray: {
//             options: { min: 1 },
//             errorMessage: "Delete Products must be an array"

//         },
//     },
//     // * means every object in the array
//     "original_products.*.id": {
//         in: ["body"],
//         // if: (value, { req }) => Array.isArray(req.body.new_products),
//         isString: { errorMessage: "Product ID must be string" },
//         notEmpty: { errorMessage: "Product ID must not be empty" }
//     },
//     "original_products.*.quantity": {
//         in: ["body"],
//         // if: (value, { req }) => Array.isArray(req.body.new_products),
//         isInt: {
//             options: { gt: 0 },
//             errorMessage: "Quantity must be greater than 0"
//         }
//     },
//     "original_products.*.method": {
//         in: ["body"],
//         isString: { errorMessage: "Method must be a string" },
//         notEmpty: { errorMessage: "Method must not be empty" },
//         isIn: { options: [["ADD", "SUB"]], errorMessage: "Method must be either 'ADD' or 'SUB'" }
//     },
//     "new_products.*.id": {
//         in: ["body"],
//         // if: (value, { req }) => Array.isArray(req.body.new_products),
//         optional: { options: { nullable: true } },
//         isString: { errorMessage: "New Product ID must be string" },
//         notEmpty: { errorMessage: "New Product ID must not be empty" }
//     },
//     "new_products.*.quantity": {
//         in: ["body"],
//         // if: (value, { req }) => Array.isArray(req.body.new_products),
//         optional: { options: { nullable: true } },
//         isInt: {
//             options: { gt: 0 },
//             errorMessage: "Quantity must be greater than 0",
//         },
//     },
//     // "delete_products.*.id": {
//     //     in: ["body"],
//     //     // if: (value, { req }) => Array.isArray(req.body.new_products),
//     //     optional: { options: { nullable: true } },
//     //     isString: { errorMessage: "Delete Product ID must be string" },
//     //     notEmpty: { errorMessage: "Delete Product ID must not be empty" }
//     // },
// };

export const transferProductsBToBValidationSchema = {
    sender_branch_id: {
        in: ['body'],
        isString: { errorMessage: "Sender Branch must be string" },
        notEmpty: { errorMessage: "Sender Branch must not be empty" }
    },
    receiver_branch_id: {
        in: ['body'],
        isString: { errorMessage: "Receiver Branch must be string" },
        notEmpty: { errorMessage: "Receiver Branch must not be empty" }
    },
    products: {
        in: ['body'],
        isArray: {
            options: { min: 1 },
            errorMessage: "Transfer Producsts must be at least one"
        },
        notEmpty: { errorMessage: "Transfer Products must not be empty" }
    },
    "products.*.id": {
        in: ["body"],
        isString: { errorMessage: "Product ID must be string" },
        notEmpty: { errorMessage: "Product ID must not be empty" }
    },
    created_by: {
        in: ['body'],
        isString: { errorMessage: "Creator must be string" },
        notEmpty: { errorMessage: "Creator must not be empty" }
    },
    "products.*.quantity": {
        in: ["body"],
        isInt: {
            options: { gt: 0 },
            errorMessage: "Quantity must be greater than 0"
        }
    }
};