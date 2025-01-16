import React, { useState } from "react";
import { addTransaction } from "../services/api";
import "./AddTransaction.css";

const AddTransaction = ({ refreshTransactions }) => {
  const [form, setForm] = useState({
    amount: "",
    type: "expense",
    category: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTransaction(form);
      refreshTransactions(); // Actualiser les transactions après un ajout
      setForm({ amount: "", type: "expense", category: "", notes: "" }); // Réinitialiser le formulaire
    } catch (error) {
      alert("Failed to add transaction");
    }
  };

  return (
    <form className="add-transaction" onSubmit={handleSubmit}>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        required
      />
      <select name="type" value={form.type} onChange={handleChange} required>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        required
      />
      <textarea
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
      ></textarea>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTransaction;
