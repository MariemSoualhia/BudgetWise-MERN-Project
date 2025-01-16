import React, { useState } from "react";
import EditTransaction from "./EditTransaction";
import { deleteTransaction } from "../services/api";
import "./TransactionList.css";

const TransactionList = ({ transactions, refreshTransactions }) => {
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      alert("Transaction supprimée avec succès !");
      refreshTransactions();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Échec de la suppression.");
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };

  const closeEdit = () => {
    setEditingTransaction(null);
  };

  if (!transactions || transactions.length === 0) {
    return <p>Aucune transaction à afficher.</p>;
  }

  return (
    <div className="transaction-list">
      <h2>Transaction List</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            <span>
              {transaction.type.toUpperCase()} - {transaction.category} - $
              {transaction.amount}
            </span>
            <button onClick={() => handleEdit(transaction)}>Update</button>
            <button onClick={() => handleDelete(transaction._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {editingTransaction && (
        <EditTransaction
          transaction={editingTransaction}
          refreshTransactions={refreshTransactions}
          closeEdit={closeEdit}
        />
      )}
    </div>
  );
};

export default TransactionList;
