import { Router } from "express";
import { createPermissionController } from "../controllers/permission.controller.mjs";

const router = Router();

router.post('/api/permission',

    createPermissionController)

export default router;