import { errorHandler } from '../utils/error.js';
import Income from '../models/income.model.js';

export const addIncome = async (req, res, next) => {
  //
  const { title, amount, category, description, date } = req.body;
  const requiredFields = [title, amount, category, description, date];
  if (!requiredFields.every((field) => field)) {
    return next(errorHandler(400, 'All fields are required'));
  }

  if (amount <= 0 || !amount === 'number') {
    return next(errorHandler(400, 'Income amount must be a positive number!'));
  }

  const newIncome = new Income({ ...req.body, userId: req.user.id });
  try {
    const savedIncome = await newIncome.save();
    res.status(201).json({ message: 'Added new income', savedIncome });
  } catch (error) {
    next(error);
  }
};
