import React, { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  motion
} from "framer-motion";

import Navbar from "../components/Navbar.jsx";

import {
  useAuth
} from "../context/AuthContext.jsx";

import {
  useToast
} from "../context/ToastContext.jsx";

function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError(
        "Please complete all fields."
      );
      return;
    }

    if (
      form.password.length < 6
    ) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      const data =
        await register(
          form.name,
          form.email,
          form.password
        );

      showToast(
        `Welcome to DEVSTORE, ${data.user.name}`
      );

      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Unable to create account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="home">
      <Navbar />

      <section className="authPage">
        <motion.div
          className="authCard"
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.97
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
        >
          <div className="authLogo">
            ◈
          </div>

          <p className="tag">
            JOIN DEVSTORE
          </p>

          <h1>
            Create Account
          </h1>

          <p className="authSubtitle">
            Create your DEVSTORE
            account to shop and track
            your orders.
          </p>

          {error && (
            <motion.div
              className="authError"
              initial={{
                opacity: 0,
                y: -5
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <label>
              Full Name
            </label>

            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />

            <label>
              Email Address
            </label>

            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />

            <label>Password</label>

            <input
              name="password"
              type="password"
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />

            <label>
              Confirm Password
            </label>

            <input
              name="confirmPassword"
              type="password"
              placeholder="Enter password again"
              value={
                form.confirmPassword
              }
              onChange={handleChange}
              autoComplete="new-password"
            />

            <motion.button
              className="authButton"
              type="submit"
              disabled={loading}
              whileHover={
                loading
                  ? {}
                  : { scale: 1.02 }
              }
              whileTap={
                loading
                  ? {}
                  : { scale: 0.96 }
              }
            >
              {loading
                ? "Creating Account..."
                : "Create Account →"}
            </motion.button>
          </form>

          <p className="authSwitch">
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}

export default Register;
