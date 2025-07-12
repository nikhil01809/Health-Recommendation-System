import express from "express";
import {authMiddleware} from "../middleware/authMiddleware.js"
import { predictDisease } from '../controllers/predictController.js';

const predictRouter = express.Router();

predictRouter.post("/predict", predictDisease);

export default predictRouter;
