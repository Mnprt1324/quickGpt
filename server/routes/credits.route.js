import express from 'express';
import { getAllplans, purchasePlan } from '../controllers/credit.controller.js';
import chectAuth from '../middlewares/auth.js';
const router = express.Router();

router.get("/plans", getAllplans);
router.post("/purchase", chectAuth, purchasePlan);


export default router;