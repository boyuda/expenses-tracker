import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { addIncome } from '../controllers/income.controller.js';
const router = express.Router();

router.post('/add-income', verifyToken, addIncome);

export default router;
