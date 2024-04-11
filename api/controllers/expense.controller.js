import { errorHandler } from '../utils/error.js';
import Expense from '../models/expense.model.js';

export const addExpense = async (req, res, next) => {
  //
  const { title, amount, category, description } = req.body;
  const requiredFields = [title, amount, category, description];
  if (!requiredFields.every((field) => field)) {
    return next(errorHandler(400, 'All fields are required'));
  }

  if (amount <= 0 || !amount === 'number') {
    return next(errorHandler(400, 'Expense amount must be a positive number!'));
  }

  const newExpense = new Expense({ ...req.body, userId: req.user.id });
  try {
    const savedExpense = await newExpense.save();
    res.status(200).json({ message: 'Added new expense', savedExpense });
  } catch (error) {
    next(error);
  }
};

export const getExpense = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    // Filter expenses based on userId
    const expenses = await Expense.find({ userId: req.user.id })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    //Get the sum of all the incoms
    const totalExpenseSum = await Expense.aggregate([
      { $match: { userId: req.user.id } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const total = totalExpenseSum.length > 0 ? totalExpenseSum[0].total : 0;

    //Get the acount of all the expense records of particular user
    const totalExpenseCount = await Expense.countDocuments({
      userId: req.user.id,
    });

    res.status(200).json({ expenses, total, totalExpenseCount });
  } catch (error) {
    next(error);
  }
};
