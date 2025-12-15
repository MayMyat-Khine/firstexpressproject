import { Router } from 'express';
import { User } from '../mongoose/schemas/user.mjs';
import { createUserValidationSchema, indexValidationSchema } from '../utils/validationSchema.mjs';
import { checkSchema, matchedData, validationResult } from 'express-validator';
import { findByUserId } from '../utils/middlewares.mjs';
import { validate } from '../utils/validate.middleware.mjs';
import { userCreateController, userGetAllController, userGetByIdController, userUpdateByIdController, userPatchByIdController, userDeleteByIdController } from '../controllers/user.controller.mjs';
const router = Router();

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