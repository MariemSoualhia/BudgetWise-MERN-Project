import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-content">
        <div className="home-text">
          <h1>Manage Your Finances with Ease</h1>
          <p>
            BudgetWise helps you track your income and expenses, analyze your
            spending, and achieve your financial goals effortlessly.
          </p>
          <div className="home-buttons">
            <button onClick={() => navigate("/dashboard")}>
              Go to Dashboard
            </button>
            <button
              className="secondary"
              onClick={() => navigate("/transactions")}
            >
              View Transactions
            </button>
          </div>
        </div>
        <div className="home-image">
          <img
            src="https://www.creativefabrica.com/wp-content/uploads/2023/02/06/Finance-Flat-Design-Illustration-Graphics-60168059-1.jpg"
            alt="Finance illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
