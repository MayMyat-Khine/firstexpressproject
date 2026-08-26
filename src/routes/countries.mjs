import { Router } from "express";
import { getAllCountriesController, postCountriesController } from "../controllers/countries.controller.mjs";


const router = Router();

router.get("/countries", getAllCountriesController);

router.post("/country", postCountriesController);

export default router;