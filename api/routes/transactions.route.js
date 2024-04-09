import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { addIncome, getIncome } from '../controllers/income.controller.js';
const router = express.Router();

router.post('/add-income', verifyToken, addIncome);
router.get('/get-income', verifyToken, getIncome);

export default router;
