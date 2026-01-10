import { getCachedBranchIds } from '../repositories/branch.repository.mjs';

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
            errorMessage: "Must not be Empty"
        },

    },
    password: {
        in: ["body"],

        notEmpty: {
            errorMessage: "Password must not be Empty"
        },

    },

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
export const createProductValidationSchema = {
    id: {
        in: ['body'],
        isString: {
            errorMessage: "ID must be a String"
        },
        notEmpty: {
            errorMessage: "ID Must not be Empty"
        }
    },
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
        custom: {
            options: async (value) => {
                const branchIds = await getCachedBranchIds();
                console.log('Branches Ids ', branchIds);
                const allExist = value.every(b => branchIds.includes(b));
                if (!allExist) {
                    throw new Error("Branch is not valid");
                }
                return true;
            }
        }
    },

    description: {
        in: ['body'],
        isString: {
            errorMessage: "Product Name must be a String"
        },
    },
    stock_id: {
        in: ["body"],
        isString: { errorMessage: "Stock ID must be string" },
        notEmpty: { errorMessage: "Stock ID must not be Empty" }
    },

    stock: {
        in: ["body"],
        isNaN: { errorMessage: "Stock must be a number" },
        notEmpty: { errorMessage: "Stock must not be Empty" }
    },
    low_stock: {
        in: ["body"],
        isNaN: { errorMessage: "Low Stock must be a number" },
        notEmpty: { errorMessage: "Low Stock must not be Empty" }
    },
}

export const createStockValidationSchema = {
    id: {
        in: ["body"],
        isString: { errorMessage: "ID must be string" },
        notEmpty: { errorMessage: "ID must not be Empty" }
    },
    product_id: {
        in: ["body"],
        isString: { errorMessage: "Product ID must be string" },
        notEmpty: { errorMessage: "Product ID must not be Empty" }
    },
    stock: {
        in: ["body"],
        isNaN: { errorMessage: "Stock must be a number" },
        notEmpty: { errorMessage: "Stock must not be Empty" }
    },
    low_stock: {
        in: ["body"],
        isNaN: { errorMessage: "Low Stock must be a number" },
        notEmpty: { errorMessage: "Low Stock must not be Empty" }
    },

}

export const createOrderValidationSchema = {
    id: {
        in: ["body"],
        isString: { errorMessage: "Order ID must be string" },
        notEmpty: { errorMessage: "Order ID must not be Empty" }
    },
    merchant_id: {
        in: ["body"],
        isString: { errorMessage: "Merchant ID must be string" },
        notEmpty: { errorMessage: "Merchant ID must not be Empty" }
    },
    customer_id: {
        in: ["body"],
        isString: { errorMessage: "Customer ID must be string" },
        notEmpty: { errorMessage: "Customer ID must not be Empty" }
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
    }

};

export const updateOrderValidationSchema = {
    original_products: {
        in: ["body"],
        optional: true,
        isArray: {
            options: { min: 1 },
            errorMessage: "Products must be an array "

        },

    },
    new_products: {
        in: ["body"],
        optional: true,
        isArray: {
            options: { min: 1 },
            errorMessage: "New Products must be an array"

        },
    },
    delete_products: {
        in: ["body"],
        optional: true,
        isArray: {
            options: { min: 1 },
            errorMessage: "Delete Products must be an array"

        },
    },
    // * means every object in the array

    "original_products.*.id": {
        in: ["body"],
        // if: (value, { req }) => Array.isArray(req.body.new_products),
        isString: { errorMessage: "Product ID must be string" },
        notEmpty: { errorMessage: "Product ID must not be empty" }
    },

    "original_products.*.quantity": {
        in: ["body"],
        // if: (value, { req }) => Array.isArray(req.body.new_products),
        isInt: {
            options: { gt: 0 },
            errorMessage: "Quantity must be greater than 0"
        }
    },

    "original_products.*.method": {
        in: ["body"],
        isString: { errorMessage: "Method must be a string" },
        notEmpty: { errorMessage: "Method must not be empty" },
        isIn: { options: [["ADD", "SUB"]], errorMessage: "Method must be either 'ADD' or 'SUB'" }
    },

    "new_products.*.id": {
        in: ["body"],
        // if: (value, { req }) => Array.isArray(req.body.new_products),
        optional: { options: { nullable: true } },
        isString: { errorMessage: "New Product ID must be string" },
        notEmpty: { errorMessage: "New Product ID must not be empty" }
    },

    "new_products.*.quantity": {
        in: ["body"],
        // if: (value, { req }) => Array.isArray(req.body.new_products),
        optional: { options: { nullable: true } },
        isInt: {
            options: { gt: 0 },
            errorMessage: "Quantity must be greater than 0",
        },
    },

    // "delete_products.*.id": {
    //     in: ["body"],
    //     // if: (value, { req }) => Array.isArray(req.body.new_products),
    //     optional: { options: { nullable: true } },
    //     isString: { errorMessage: "Delete Product ID must be string" },
    //     notEmpty: { errorMessage: "Delete Product ID must not be empty" }
    // },


};