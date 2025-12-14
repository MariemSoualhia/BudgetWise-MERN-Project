import React, { useState } from "react";
import EditTransaction from "./EditTransaction";
import { deleteTransaction } from "../services/api";
import "./TransactionList.css";

const TransactionList = ({ transactions, refreshTransactions }) => {
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      refreshTransactions();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEdit = (transaction) => setEditingTransaction(transaction);
  const closeEdit = () => setEditingTransaction(null);

  if (!transactions || transactions.length === 0) {
    return (
      <div className="transaction-empty">
        <p>Aucune transaction à afficher.</p>
      </div>
    );
  }

  return (
    <div className="transaction-page">
      <h2>Transactions</h2>
      <div className="transaction-list">
        {transactions.map((t) => (
          <div key={t._id} className="transaction-card">
            <div className="transaction-info">
              <span className={`type ${t.type}`}>{t.type.toUpperCase()}</span>
              <span className="category">{t.category}</span>
              <span className="amount">${t.amount}</span>
            </div>
            <div className="transaction-actions">
              <button className="btn-edit" onClick={() => handleEdit(t)}>
                Edit
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDelete(t._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

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
