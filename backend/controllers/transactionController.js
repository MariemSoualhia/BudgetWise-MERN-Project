const Transaction = require("../models/Transaction");

exports.addTransaction = async (req, res) => {
  try {
    const transaction = new Transaction({
      ...req.body,
      user: req.user._id,
    });

    await transaction.save();
    res
      .status(201)
      .json({ message: "Transaction added successfully!", transaction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add transaction." });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions." });
  }
};
