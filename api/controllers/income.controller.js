import { errorHandler } from '../utils/error.js';
import Income from '../models/income.model.js';

export const addIncome = async (req, res, next) => {
  //
  const { title, amount, category, description, date } = req.body;
  const requiredFields = [title, amount, category, description];
  if (!requiredFields.every((field) => field)) {
    return next(errorHandler(400, 'All fields are required'));
  }

  if (amount <= 0 || !amount === 'number') {
    return next(errorHandler(400, 'Income amount must be a positive number!'));
  }

  const newIncome = new Income({ ...req.body, userId: req.user.id });
  try {
    const savedIncome = await newIncome.save();
    res.status(200).json({ message: 'Added new income', savedIncome });
  } catch (error) {
    next(error);
  }
};

export const getIncome = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;

    // Filter incomes based on userId
    const incomes = await Income.find({ userId: req.user.id })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    //Get the sum of all the incoms
    const totalIncomeSum = await Income.aggregate([
      { $match: { userId: req.user.id } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const total = totalIncomeSum.length > 0 ? totalIncomeSum[0].total : 0;

    //Get the acount of all the income records of particular user
    const totalIncomeCount = await Income.countDocuments({
      userId: req.user.id,
    });

    res.status(200).json({ incomes, total, totalIncomeCount });
  } catch (error) {
    next(error);
  }
};
