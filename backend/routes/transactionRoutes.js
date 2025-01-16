const express = require("express");
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/add", protect, addTransaction);

router.get("/all", protect, getTransactions);

router.delete("/:id", protect, deleteTransaction);

router.put("/:id", protect, updateTransaction);

module.exports = router;
