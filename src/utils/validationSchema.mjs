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

export const createProductValidationSchema = {
    id: {
        in: ['body'],
        isString: {
            errorMessage: "ID must be a String"
        },
        notEmpty: {
            errorMessage: "Must not be Empty"
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