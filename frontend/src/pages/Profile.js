import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useUser } from "../context/UserContext";
import "./Profile.css";

const Profile = () => {
  const { user } = useUser();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email, password: "" });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully! (Functionality to be implemented)");
    // Ici tu peux ajouter l'API call pour mettre à jour le profil
  };

  return (
    <>
      <div className="profile-page">
        <div className="profile-container">
          <h1>Your Profile</h1>
          <form className="profile-form" onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label>New Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              value={form.password}
              onChange={handleChange}
            />

            <button type="submit">Update Profile</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
