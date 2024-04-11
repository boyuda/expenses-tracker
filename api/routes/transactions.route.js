import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { addIncome, getIncome } from '../controllers/income.controller.js';
import { addExpense, getExpense } from '../controllers/expense.controller.js';
const router = express.Router();

router.post('/add-income', verifyToken, addIncome);
router.get('/get-income', verifyToken, getIncome);
router.post('/add-expense', verifyToken, addExpense);
router.get('/get-expense', verifyToken, getExpense);

export default router;
