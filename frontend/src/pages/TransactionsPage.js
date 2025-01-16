import React, { useState, useEffect } from "react";
import TransactionList from "../components/TransactionList";
import AddTransaction from "../components/AddTransaction";
import { getTransactions } from "../services/api";
import "./TransactionsPage.css";
const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);

  const refreshTransactions = async () => {
    try {
      const { data } = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error(
        "Erreur lors du rafraîchissement des transactions :",
        error
      );
    }
  };

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
