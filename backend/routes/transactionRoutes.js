const express = require("express");
const {
  addTransaction,
  getTransactions,
} = require("../controllers/transactionController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/add", protect, addTransaction);
router.get("/all", protect, getTransactions);

module.exports = router;
