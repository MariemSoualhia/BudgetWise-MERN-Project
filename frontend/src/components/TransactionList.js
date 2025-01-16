import React from "react";
import "./TransactionList.css";

const TransactionList = ({ transactions }) => {
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
