import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Corrected imports
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../Actions/authActions";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Sprout,
  Eye,
  EyeOff,
} from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "consumer",
    phoneNumber: "",
    lga: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Grab auth state from Redux
  const auth = useSelector((state) => state.auth);
  const { loading, error, isAuthenticated } = auth;

  // EFFECT: Redirect to home if signup is successful
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      // You could set a local error state here instead of alert
      alert("Passwords do not match!");
      return;
    }

    const userPayload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      phoneNumber: formData.phoneNumber,
      lga: formData.role === "farmer" ? formData.lga : "Plateau State",
    };

    dispatch(signup(userPayload));
  };

  const styles = {
    // ... your existing styles ...
    wrapper: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background:
        'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600") center/cover',
      padding: "20px",
      fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    },
    card: {
      background: "rgba(255, 255, 255, 0.98)",
      width: "100%",
      maxWidth: "480px",
      padding: "35px",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    },
    header: { textAlign: "center", marginBottom: "25px" },
    brand: {
      color: "#2e7d32",
      fontSize: "2rem",
      margin: "5px 0",
      fontWeight: "bold",
    },
    inputGroup: { position: "relative", marginBottom: "15px" },
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
    },
    input: {
      width: "100%",
      padding: "12px 40px 12px 40px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "0.95rem",
      boxSizing: "border-box",
      outline: "none",
    },
    row: { display: "flex", gap: "10px", marginBottom: "15px" },
    roleBox: (isActive) => ({
      flex: 1,
      padding: "10px",
      border: `2px solid ${isActive ? "#2e7d32" : "#ddd"}`,
      borderRadius: "8px",
      textAlign: "center",
      cursor: "pointer",
      backgroundColor: isActive ? "#e8f5e9" : "white",
      color: isActive ? "#2e7d32" : "#666",
      fontWeight: "600",
      transition: "0.2s",
    }),
    button: {
      width: "100%",
      padding: "14px",
      backgroundColor: "#2e7d32",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "10px",
    },
    link: { color: "#2e7d32", textDecoration: "none", fontWeight: "bold" },
    // NEW: Error message style
    errorBox: {
      backgroundColor: "#ffebee",
      color: "#c62828",
      padding: "10px",
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
          <Sprout size={42} color="#2e7d32" />
          <h1 style={styles.brand}>Serendipity</h1>
          <p style={{ color: "#666", fontSize: "0.9rem" }}>
            Create your account to start trading
          </p>
        </div>

        {/* INLINE ERROR MESSAGE */}
        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* ... Inputs remain the same ... */}
          <div style={styles.inputGroup}>
            <User style={styles.icon} size={18} />
            <input
              style={styles.input}
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <Mail style={styles.icon} size={18} />
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <Lock style={styles.icon} size={18} />
            <input
              style={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          <div style={styles.inputGroup}>
            <Lock style={styles.icon} size={18} />
            <input
              style={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          <div style={styles.row}>
            <div style={{ ...styles.inputGroup, flex: 1, marginBottom: 0 }}>
              <Phone style={styles.icon} size={18} />
              <input
                style={styles.input}
                type="text"
                placeholder="Phone"
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                required
              />
            </div>

            {formData.role === "farmer" && (
              <div style={{ ...styles.inputGroup, flex: 1, marginBottom: 0 }}>
                <MapPin style={styles.icon} size={18} />
                <select
                  style={styles.input}
                  value={formData.lga}
                  onChange={(e) =>
                    setFormData({ ...formData, lga: e.target.value })
                  }
                  required
                >
                  <option value="">LGA</option>
                  <option value="Jos North">Jos North</option>
                  <option value="Jos South">Jos South</option>
                  <option value="Mangu">Mangu</option>
                  <option value="Bokkos">Bokkos</option>
                </select>
              </div>
            )}
          </div>

          <div style={styles.row}>
            <div
              style={styles.roleBox(formData.role === "consumer")}
              onClick={() => setFormData({ ...formData, role: "consumer" })}
            >
              Consumer
            </div>
            <div
              style={styles.roleBox(formData.role === "farmer")}
              onClick={() => setFormData({ ...formData, role: "farmer" })}
            >
              Farmer
            </div>
          </div>

          <button
            type="submit"
            style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "0.9rem",
            color: "#666",
          }}
        >
          Already have an account?{" "}
          <Link to="/signin" style={styles.link}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
