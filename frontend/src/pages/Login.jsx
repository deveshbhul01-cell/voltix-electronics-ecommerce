import React, { useState } from "react";

import {
  Link,
  useLocation,
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

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    email: "",
    password: ""
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
      !form.email ||
      !form.password
    ) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    try {
      setLoading(true);

      const data = await login(
        form.email,
        form.password
      );

      showToast(
        `Welcome back, ${data.user.name}`
      );

      const destination =
        location.state?.from ||
        "/";

      navigate(destination, {
        replace: true
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Unable to login. Please try again."
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
          transition={{
            duration: 0.5
          }}
        >
          <motion.div
            className="authLogo"
            animate={{
              y: [0, -6, 0]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity
            }}
          >
            ◈
          </motion.div>

          <p className="tag">
            WELCOME BACK
          </p>

          <h1>
            Login to DEVSTORE
          </h1>

          <p className="authSubtitle">
            Access your account,
            wishlist and orders.
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
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
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
                ? "Signing in..."
                : "Login →"}
            </motion.button>
          </form>

          <p className="authSwitch">
            New to DEVSTORE?{" "}
            <Link to="/register">
              Create Account
            </Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}

export default Login;
