import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { getTransactions } from "../services/api";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const fetchTransactions = async () => {
    try {
      const { data } = await getTransactions();
      setTransactions(data);

      const income = data
        .filter((t) => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0);
      const expense = data
        .filter((t) => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0);

      setTotalIncome(income);
      setTotalExpense(expense);
    } catch (error) {
      console.error("Erreur lors de la récupération des transactions :", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card income-card">
          <h3>Total Income</h3>
          <p>${totalIncome}</p>
        </div>
        <div className="card expense-card">
          <h3>Total Expense</h3>
          <p>${totalExpense}</p>
        </div>
        <div className="card transactions-card">
          <h3>Total Transactions</h3>
          <p>{transactions.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
