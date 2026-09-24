import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiLock,
  FiMail,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiShield,
} from "react-icons/fi";
import { portfolioApi } from "../lib/api";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await portfolioApi.login(email.trim(), password);

      if (res && res.success) {
        localStorage.setItem("ishwar_admin_auth", "true");
        if (res.token) {
          localStorage.setItem("ishwar_admin_token", res.token);
        }
        if (res.user) {
          localStorage.setItem("ishwar_admin_user", JSON.stringify(res.user));
        }

        setTimeout(() => {
          nav("/admin");
        }, 400);
      } else {
        setError(res?.message || "Invalid admin email or password.");
        setLoading(false);
      }
    } catch (err) {
      // Direct credential verification fallback if backend server isn't started yet
      if (
        email.trim().toLowerCase() === "ishwarweb@admin.com" &&
        password === "AdminIshwar@1234#"
      ) {
        localStorage.setItem("ishwar_admin_auth", "true");
        setTimeout(() => {
          nav("/admin");
        }, 400);
      } else {
        setError(err.message || "Invalid admin email or password.");
        setLoading(false);
      }
    }
  };

  return (
    <main className="admin-login">

      {/* Background effects */}
      <div className="admin-bg-glow glow-top" />
      <div className="admin-bg-glow glow-bottom" />

      <div className="admin-login-card">

        {/* Logo */}
        <div className="admin-brand">
          <div className="admin-brand-icon">
            <FiShield />
          </div>

          <div>
            <div className="login-logo">
              Ishwar<span>.</span>
            </div>

            <small>ADMIN PORTAL</small>
          </div>
        </div>


        {/* Heading */}
        <div className="login-heading">
          <span className="login-eyebrow">
            SECURE ACCESS
          </span>

          <h1>
            Welcome <span>Back</span>
          </h1>

          <p>
            Sign in to manage your portfolio,
            projects and content.
          </p>
        </div>


        {/* Form */}
        <form onSubmit={submit} className="admin-login-form">

          {/* Email */}
          <div className="input-group">

            <label htmlFor="admin-email">
              <span>
                <FiMail />
                Email Address
              </span>
            </label>

            <div className="input-wrap">

              <FiMail className="input-icon" />

              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Enter admin email"
                autoComplete="username"
                required
              />

            </div>

          </div>


          {/* Password */}
          <div className="input-group">

            <label htmlFor="admin-password">
              <span>
                <FiLock />
                Password
              </span>
            </label>

            <div className="input-wrap">

              <FiLock className="input-icon" />

              <input
                id="admin-password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter admin password"
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShow(!show)}
                aria-label={
                  show
                    ? "Hide password"
                    : "Show password"
                }
              >
                {show ? <FiEyeOff /> : <FiEye />}
              </button>

            </div>

          </div>


          {/* Error */}
          {error && (
            <div className="login-error">
              <FiShield />
              <span>{error}</span>
            </div>
          )}


          {/* Submit */}
          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="login-spinner" />
                Signing In...
              </>
            ) : (
              <>
                Sign In
                <FiArrowRight />
              </>
            )}
          </button>

        </form>


        {/* Footer */}
        <div className="login-security">

          <FiLock />

          <span>
            Secure Admin Access
          </span>

          <i />

          <span>
            Ishwar Portfolio
          </span>

        </div>

      </div>

    </main>
  );
}