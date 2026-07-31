import { Router } from "express";
import { createPermissionController, getAllPermissionsController } from "../controllers/permission.controller.mjs";

const router = Router();

router.get('/api/permissions', getAllPermissionsController);

router.post('/api/permission', createPermissionController);

export default router;