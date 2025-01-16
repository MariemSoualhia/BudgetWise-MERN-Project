import React, { useState, useEffect } from "react";
import TransactionList from "../components/TransactionList";
import AddTransaction from "../components/AddTransaction";
import { getTransactions } from "../services/api";
const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  // Fonction pour rafraîchir les transactions
  const refreshTransactions = async () => {
    try {
      const { data } = await getTransactions();
      setTransactions(data); // Mettre à jour l'état avec les transactions
    } catch (error) {
      console.error(
        "Erreur lors du rafraîchissement des transactions :",
        error
      );
    }
  };

  // Charger les transactions au montage
  useEffect(() => {
    refreshTransactions();
  }, []);

  return (
    <div className="transactions-page">
      <h1>My Transactions</h1>
      <AddTransaction refreshTransactions={refreshTransactions} />
      <TransactionList
        transactions={transactions}
        refreshTransactions={refreshTransactions}
      />
    </div>
  );
};

export default TransactionsPage;
