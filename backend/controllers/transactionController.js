const Transaction = require("../models/Transaction");

// Ajouter une transaction
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

// Récupérer toutes les transactions de l'utilisateur connecté
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions." });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    // Vérifie si l'utilisateur est le propriétaire de la transaction
    if (transaction.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ error: "Not authorized to delete this transaction." });
    }

    // Supprime la transaction directement
    await Transaction.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Transaction deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete transaction." });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found." });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ error: "Not authorized to update this transaction." });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Transaction updated successfully!",
      updatedTransaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update transaction." });
  }
};
