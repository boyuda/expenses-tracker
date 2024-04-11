import mongoose from 'mongoose';

// Creating a Model
const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50,
    },
    amount: {
      type: Number,
      required: true,
      maxLength: 20,
      trim: true,
    },
    type: {
      type: String,
      default: 'expense',
    },
    category: {
      type: String,
      required: true,
      trim: true,
      default: 'Salary',
    },
    description: {
      type: String,
      required: true,
      maxLength: 30,
      trim: true,
    },
  },
  { timestamps: true }
);

//Creating a model
const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
