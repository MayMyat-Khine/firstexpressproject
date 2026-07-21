import { Router } from 'express';
import { User } from '../mongoose/schemas/user.mjs';
import { createUserValidationSchema, indexValidationSchema, updateUserValidationSchema } from '../utils/validationSchema.mjs';
import { checkSchema, matchedData, validationResult } from 'express-validator';
import { validate, validatePatchBody } from '../middlewares/validate.middleware.mjs';
import { userCreateController, userGetAllController, userGetByIdController, userUpdateByIdController, userDeleteByIdController } from '../controllers/user.controller.mjs';
const router = Router();

var name = ""
var password = ""



// router.post("/api/login", (req, res) => {
//     const n = req.body.username;
//     const p = req.body.password;
//     console.log("Name ", n)
//     console.log("password", p)
//     if (n === name && p === password) {
//         return res.status(200).send({ success: true, body: { name: name, password: password } });
//     }
//     return res.status(404).send({ success: false, message: "User Not Found" });

// })


router.post('/api/user',
    checkSchema(createUserValidationSchema),
    validate,
    userCreateController,
);

router.get('/api/users',
    userGetAllController);

router.get('/api/user/:id',
    checkSchema(indexValidationSchema),
    validate,
    userGetByIdController);

router.patch('/api/user/:id',
    checkSchema(indexValidationSchema),
    // findByUserId,
    validatePatchBody,
    checkSchema(updateUserValidationSchema),
    validate,
    userUpdateByIdController
)

// // can validate the ID of the request body before updating
// router.patch('/api/user/:id',
//     checkSchema(indexValidationSchema),
//     findByUserId,
//     userPatchByIdController
// );

router.delete('/api/user/:id',
    checkSchema(indexValidationSchema),
    validate,
    userDeleteByIdController
);



export default router;