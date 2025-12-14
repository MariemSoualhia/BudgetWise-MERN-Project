import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Create Account</h1>
        <p className="register-subtitle">
          Join us and start managing your budget
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
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
          <button type="submit" className="btn-register">
            Register
          </button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
