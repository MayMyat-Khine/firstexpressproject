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