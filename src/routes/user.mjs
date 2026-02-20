import { Router } from 'express';
import { User } from '../mongoose/schemas/user.mjs';
import { createUserValidationSchema, indexValidationSchema } from '../utils/validationSchema.mjs';
import { checkSchema, matchedData, validationResult } from 'express-validator';
import { findByUserId } from '../utils/middlewares.mjs';
import { validate } from '../utils/validate.middleware.mjs';
import { userCreateController, userGetAllController, userGetByIdController, userUpdateByIdController, userPatchByIdController, userDeleteByIdController } from '../controllers/user.controller.mjs';
const router = Router();

var name = ""
var password = ""
router.post("/api/register", (req, res) => {
    name = req.body.username;
    password = req.body.password;

    return res.status(200).send({ success: true, body: { name: name, password: password } });
})


router.post("/api/login", (req, res) => {
    const n = req.body.username;
    const p = req.body.password;
    console.log("Name ", n)
    console.log("password", p)
    if (n === name && p === password) {
        return res.status(200).send({ success: true, body: { name: name, password: password } });
    }
    return res.status(404).send({ success: false, message: "User Not Found" });

})


router.post('/api/user',
    checkSchema(createUserValidationSchema),
    validate,
    userCreateController,
);

router.get('/api/user',
    userGetAllController);

router.get('/api/user/:id',
    checkSchema(indexValidationSchema),
    findByUserId,
    userGetByIdController);


// can validate the ID of the request body before updating
router.put('/api/user/:id',
    checkSchema(indexValidationSchema),
    findByUserId,
    userUpdateByIdController

)

// can validate the ID of the request body before updating
router.patch('/api/user/:id',
    checkSchema(indexValidationSchema),
    findByUserId,
    userPatchByIdController
);

router.delete('/api/user/:id',
    checkSchema(indexValidationSchema),
    findByUserId,
    userDeleteByIdController
);



export default router;