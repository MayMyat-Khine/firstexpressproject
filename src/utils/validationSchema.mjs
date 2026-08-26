// import { getCachedBranchIdsRepo } from '../repositories/branch.repository.mjs';


export const loginCustomerValidaionSchema = {

    region: {
        in: ["body"],
        isString: {
            errorMessage: "Region Must be String"
        },
        notEmpty: {
            errorMessage: "Region Must not be Empty"
        },
    },
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

export const createCountryValidationSchema = {

    name: {
        in: ["body"],
        isString: {
            errorMessage: "Country name must be a string"
        },
        notEmpty: {
            errorMessage: "Country name must not be empty"
        }
    },
    code: {
        in: ["body"],
        isString: {
            errorMessage: "Country code must be a string"
        },
        notEmpty: {
            errorMessage: "Country code must not be empty"
        }
    },
    dialCode: {
        in: ["body"],
        isString: {
            errorMessage: "Country dialCode must be a string"
        },
        notEmpty: {
            errorMessage: "Country dialCode must not be empty"
        }
    }
};

export const loginUserValidaionSchema = {
    name: {
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

export const refreshTokenValidaionSchema = {
    refresh_token: {
        in: ["body"],
        isString: {
            errorMessage: "Refresh Token Must be String"
        },
        notEmpty: {
            errorMessage: "Refresh Token must not be empty"
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
    region: {
        in: ["body"],
        isMongoId: {
            errorMessage: "Region must be a valid country ID"
        },
        notEmpty: {
            errorMessage: "Region must not be empty"
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

export const updateCustomerValidationScheme = {

    images: {
        in: ['body'],
        isString: {
            errorMessage: "Name Must be String"
        },
        optional: true
    },
    name: {
        in: ["body"],
        isString: {
            errorMessage: "Name Must be String"
        },
        notEmpty: {
            errorMessage: "Name Must not be Empty"
        },
        optional: true
    },
    phone_number: {
        in: ["body"],
        isString: {
            errorMessage: "Phone Must be String"
        },
        notEmpty: {
            errorMessage: "Phone not be Empty"
        },
        optional: true
    },
    password: {
        in: ["body"],
        optional: true,
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
        },
    },

}

export const createRoleValidationSchema = {

    name: {
        notEmpty: {
            errorMessage: "Role name is required."
        },
        isString: {
            errorMessage: "Role name must be a string."
        },
        trim: true
    },

    permissions: {
        notEmpty: {
            errorMessage: "Permission list is required."
        },
        isArray: {
            errorMessage: "Permission must be an array."
        }
    },
};


export const updateRoleValidationSchema = {

    permissions: {
        notEmpty: {
            errorMessage: "Permission list is required."
        },
        isArray: {
            errorMessage: "Permission must be an array."
        }
    },
};

export const createUserValidationSchema = {
    id: {
        in: ["body"],
        isString: {
            errorMessage: "ID Must be String"
        },
        notEmpty: {
            errorMessage: "Must not be Empty"
        },
        custom: {
            options: (value) => {
                if (/\s/.test(value)) {
                    throw new Error("User ID cannot contain spaces");
                }
                return true;
            },
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
    role: {
        in: ["body"],
        isString: {
            errorMessage: "Role Must be String"
        },
        notEmpty: {
            errorMessage: "Role Must not be Empty"
        },
    }

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
    },
    role: {
        in: ["body"],
        optional: true,
        isString: {
            errorMessage: "Role must be string"
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


export const getProductsPaginationValidationSchema = {
    page: {
        optional: true,
        isInt: {
            options: { min: 1 }
        },
        toInt: true
    },
    limit: {
        optional: true,
        isInt: {
            options: { min: 1, max: 100 }
        },
        toInt: true
    },
    search: {
        optional: true,
        isString: true,
        trim: true
    },
    branchId: {
        optional: true,
        isString: true,
        trim: true
    }
};

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
    unit: {
        in: ['body'],
        isString: {
            errorMessage: "Unit must be a String"
        },
        notEmpty: {
            errorMessage: "Unit Must not be Empty"
        }
    },
    price: {
        in: ["body"],
        isArray: {
            options: { min: 1 },
            errorMessage: "Price must contain at least one currency.",
        },
        custom: {
            options: (value) => {
                if (!Array.isArray(value) || !value.some(item => item?.currency === "USD")) {
                    throw new Error("USD price is needed as default");
                }
                return true;
            }
        },
    },

    "price.*.amount": {
        in: ["body"],
        isFloat: {
            options: { min: 0 },
            errorMessage: "Amount must be greater than or equal to 0.",
        },
        toFloat: true,
    },

    "price.*.currency": {
        in: ["body"],
        isIn: {
            options: [["MMK", "THB", "USD", "SGD"]],
            errorMessage: "Invalid currency.",
        },
    },
    images: {
        in: ['body'],
        exists: {
            errorMessage: 'images is required'
        },
        isArray: {
            options: { min: 1 },
            errorMessage: "Image must be an array "

        }
    },

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
    delete_image: {
        in: ['body'],
        isArray: {
            options: { min: 1 },
            errorMessage: "Delete Images must be an array "

        },
        notEmpty: {
            errorMessage: "Delete Images Must not be Empty"
        },
        optional: true
    },
    images: {
        in: ["body"],
        optional: true,
        isArray: {
            options: { min: 1 },
            errorMessage: "Image must be an array with at least one image",
        },
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
    unit: {
        in: ['body'],
        isString: {
            errorMessage: "Unit must be a String"
        },
        notEmpty: {
            errorMessage: "Unit Must not be Empty"
        },
        optional: true
    },
    price: {
        in: ["body"],
        optional: true,
        isArray: {
            options: { min: 1 },
            errorMessage: "Price must contain at least one currency.",
        },
        custom: {
            options: (value) => {
                if (!Array.isArray(value) || !value.some(item => item?.currency === "USD")) {
                    throw new Error("USD price is needed as default");
                }
                return true;
            }
        }
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

    currency: {
        in: ["body"],
        isString: { errorMessage: "Currency must be string" },
        notEmpty: { errorMessage: "Currency must not be Empty" },
        isIn: {
            options: [["MMK", "THB", "USD", "SGD"]],
            errorMessage: "Invalid currency."
        }
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
    address: {
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

export const createCartValidationSchema = {
    items: {
        in: ["body"],
        isArray: {
            options: { min: 1 },
            errorMessage: "Cart must contain at least one item"
        },
        notEmpty: {
            errorMessage: "Items must not be empty"
        }
    },

    "items.*.product_id": {
        in: ["body"],
        isString: {
            errorMessage: "Product ID must be a string"
        },
        notEmpty: {
            errorMessage: "Product ID is required"
        }
    },

    "items.*.quantity": {
        in: ["body"],
        isInt: {
            options: { gt: 0 },
            errorMessage: "Quantity must be greater than 0"
        },
        toInt: true
    },

    "items.*.price": {
        in: ["body"],
        isFloat: {
            options: { gt: 0 },
            errorMessage: "Price must be greater than 0"
        },
        toFloat: true
    }
};
