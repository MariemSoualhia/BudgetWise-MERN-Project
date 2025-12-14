import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../context/UserContext";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useUser();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(form);
      login(data.user, data.token);
      toast.success("Logged in successfully!");
      navigate("/home");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p className="login-subtitle">Login to your account</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
