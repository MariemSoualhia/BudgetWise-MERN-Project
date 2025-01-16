import React, { useState } from "react";
import { updateTransaction } from "../services/api";

const UpdateTransaction = ({ transaction, refreshTransactions }) => {
  const [form, setForm] = useState(transaction);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTransaction(transaction._id, form);
      refreshTransactions(); // Actualise la liste après mise à jour
    } catch (error) {
      alert("Failed to update transaction");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Transaction</h2>
      <select name="type" value={form.type} onChange={handleChange} required>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="text"
        name="category"
        value={form.category}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        required
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateTransaction;
