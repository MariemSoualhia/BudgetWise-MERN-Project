import React, { useState } from "react";
import { updateTransaction } from "../services/api";
import "./EditTransaction.css";

const EditTransaction = ({ transaction, refreshTransactions, closeEdit }) => {
  const [form, setForm] = useState({
    amount: transaction.amount,
    type: transaction.type,
    category: transaction.category,
    notes: transaction.notes,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTransaction(transaction._id, form);
      alert("Transaction mise à jour avec succès !");
      refreshTransactions(); // Rafraîchit la liste après mise à jour
      closeEdit(); // Ferme le formulaire d'édition
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la transaction :", error);
      alert("Échec de la mise à jour de la transaction.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-transaction">
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
      <button type="submit">Mettre à jour</button>
      <button type="button" onClick={closeEdit}>
        Annuler
      </button>
    </form>
  );
};

export default EditTransaction;
