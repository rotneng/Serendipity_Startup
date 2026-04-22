import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Added useSelector
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { signin } from "../Actions/authActions";
import { Mail, Lock, Sprout, ArrowRight, Eye, EyeOff } from "lucide-react";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    requiredRole: "consumer",
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const { loading, error, isAuthenticated } = auth;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(formData));
  };

  const styles = {
    wrapper: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background:
        'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1600") center/cover',
      padding: "20px",
      fontFamily: "sans-serif",
    },
    card: {
      background: "rgba(255, 255, 255, 0.98)",
      width: "100%",
      maxWidth: "400px",
      padding: "40px",
      borderRadius: "16px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    },
    header: { textAlign: "center", marginBottom: "30px" },
    brand: {
      color: "#2e7d32",
      fontSize: "2rem",
      margin: "10px 0 5px",
      fontWeight: "bold",
    },
    subText: { color: "#666", fontSize: "0.9rem" },
    inputGroup: { position: "relative", marginBottom: "20px" },
    icon: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#2e7d32",
    },
    eyeIcon: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#999",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
    },
    input: {
      width: "100%",
      padding: "14px 40px 14px 40px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "1rem",
      boxSizing: "border-box",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#2e7d32",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1.1rem",
      fontWeight: "bold",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      transition: "0.3s",
    },
    roleToggle: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginBottom: "25px",
      borderBottom: "1px solid #eee",
      paddingBottom: "10px",
    },
    roleItem: (isActive) => ({
      cursor: "pointer",
      color: isActive ? "#2e7d32" : "#999",
      fontWeight: "bold",
      fontSize: "0.9rem",
      borderBottom: isActive ? "2px solid #2e7d32" : "2px solid transparent",
      padding: "5px 10px",
      transition: "0.3s",
    }),
    link: { color: "#2e7d32", textDecoration: "none", fontWeight: "bold" },
    errorBox: {
      backgroundColor: "#ffebee",
      color: "#c62828",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "20px",
      fontSize: "0.85rem",
      textAlign: "center",
      border: "1px solid #ef9a9a",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.header}>
          <Sprout size={40} color="#2e7d32" />
          <h1 style={styles.brand}>Welcome Back</h1>
          <p style={styles.subText}>Sign in to your Serendipity account</p>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        <div style={styles.roleToggle}>
          <div
            style={styles.roleItem(formData.requiredRole === "consumer")}
            onClick={() =>
              setFormData({ ...formData, requiredRole: "consumer" })
            }
          >
            CONSUMER
          </div>
          <div
            style={styles.roleItem(formData.requiredRole === "farmer")}
            onClick={() => setFormData({ ...formData, requiredRole: "farmer" })}
          >
            FARMER
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <Mail style={styles.icon} size={20} />
            <input
              style={styles.input}
              type="email"
              placeholder="Email Address"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <Lock style={styles.icon} size={20} />
            <input
              style={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <button
            type="submit"
            style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Sign In"} <ArrowRight size={20} />
          </button>
        </form>

        <div
          style={{
            marginTop: "25px",
            textAlign: "center",
            fontSize: "0.85rem",
            color: "#666",
          }}
        >
          New to Serendipity?{" "}
          <Link to="/signup" style={styles.link}>
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
