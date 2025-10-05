import express from 'express';
import { getAllplans, purchasePlan, verifyPayment } from '../controllers/credit.controller.js';
import chectAuth from '../middlewares/auth.js';
const router = express.Router();

router.get("/plans", getAllplans);
router.post("/purchase", chectAuth, purchasePlan);
router.post("/payment-verify", chectAuth, verifyPayment);


export default router;