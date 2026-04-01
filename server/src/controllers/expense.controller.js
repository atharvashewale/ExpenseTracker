import Expense from "../models/expense.model.js";

export const getExpenses = async (_req, res) => {
  try {
    const expenses = await Expense.find().sort({
        date: -1,
        createdAt: -1
    });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch expenses",
    });
  }
};

export const createExpense = async (
  req,
  res
) => {
  try {
    const expense = await Expense.create(
      req.body
    );

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create expense",
    });
  }
};

export const updateExpense = async (
  req,
  res
) => {
  try {
    const updatedExpense =
      await Expense.findByIdAndUpdate(
        req.params.id,
        req.body,
        { returnDocument: 'after' }
      );

      console.log(updatedExpense);

    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update expense",
    });
  }
};

export const deleteExpense = async (
  req,
  res
) => {
  try {
    await Expense.findByIdAndDelete(
      req.params.id
    );

    res.status(204).send({message: "Deleted Successfull!"});
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete expense",
    });
  }
};