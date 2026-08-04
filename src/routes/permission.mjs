import { Router } from "express";
import { createPermissionController, getAllPermissionsController } from "../controllers/permission.controller.mjs";

const router = Router();

router.get('/permissions', getAllPermissionsController);

router.post('/permission', createPermissionController);

export default router;