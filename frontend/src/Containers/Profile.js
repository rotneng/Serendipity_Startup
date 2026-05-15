import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Calendar,
  Package,
  Settings,
  ShoppingBag,
  PlusCircle,
  MapPin,
  Loader2,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  const styles = {
    container: {
      padding: isMobile ? "20px 5%" : "40px 10%",
      backgroundColor: "#f9fbf9",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    profileCard: {
      background: "white",
      borderRadius: "15px",
      padding: isMobile ? "20px" : "30px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      textAlign: isMobile ? "center" : "left",
      gap: isMobile ? "15px" : "30px",
      marginBottom: "30px",
    },
    avatar: {
      width: isMobile ? "100px" : "120px",
      height: isMobile ? "100px" : "120px",
      borderRadius: "50%",
      backgroundColor: "#e8f5e9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#2e7d32",
      fontSize: isMobile ? "2.5rem" : "3rem",
      fontWeight: "bold",
      border: "4px solid #2e7d32",
      flexShrink: 0,
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
    },
    actionCard: {
      background: "white",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      textAlign: "center",
      transition: "0.3s",
      textDecoration: "none",
      color: "#333",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
    },
    roleBadge: {
      backgroundColor: "#2e7d32",
      color: "white",
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "0.8rem",
      fontWeight: "bold",
      textTransform: "uppercase",
      display: "inline-block",
      marginBottom: "5px",
    },
    metaContainer: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "5px" : "20px",
      color: "#666",
      marginTop: "10px",
      fontSize: isMobile ? "0.9rem" : "1rem",
    },
  };

  if (loading)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "100px" }}
      >
        <Loader2 className="animate-spin" size={40} color="#2e7d32" />
      </div>
    );

  return (
    <div style={styles.container}>
      <h1
        style={{
          marginBottom: "30px",
          color: "#2e7d32",
          fontSize: isMobile ? "1.5rem" : "2rem",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        My Profile
      </h1>

      <div style={styles.profileCard}>
        <div style={styles.avatar}>{user?.name?.charAt(0).toUpperCase()}</div>
        <div style={{ width: "100%" }}>
          <span style={styles.roleBadge}>{user?.role}</span>
          <h2
            style={{ fontSize: isMobile ? "1.5rem" : "2rem", margin: "5px 0" }}
          >
            {user?.name}
          </h2>
          <div style={styles.metaContainer}>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: isMobile ? "center" : "flex-start",
                gap: "5px",
                margin: 0,
              }}
            >
              <Mail size={16} /> {user?.email}
            </p>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: isMobile ? "center" : "flex-start",
                gap: "5px",
                margin: 0,
              }}
            >
              <Calendar size={16} /> Joined{" "}
              {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div style={styles.infoGrid}>
        <Link to="/me/update" style={styles.actionCard}>
          <Settings size={32} color="#2e7d32" />
          <h3>Edit Profile</h3>
          <p style={{ color: "#777", fontSize: "0.9rem" }}>
            Update your personal details and password.
          </p>
        </Link>

        {user?.role === "farmer" ? (
          <>
            <Link to="/add-product" style={styles.actionCard}>
              <PlusCircle size={32} color="#2e7d32" />
              <h3>Add New Harvest</h3>
              <p style={{ color: "#777", fontSize: "0.9rem" }}>
                List new produce for the marketplace.
              </p>
            </Link>
            <Link to="/my-products" style={styles.actionCard}>
              <Package size={32} color="#2e7d32" />
              <h3>Manage Products</h3>
              <p style={{ color: "#777", fontSize: "0.9rem" }}>
                View and edit your current listings.
              </p>
            </Link>
          </>
        ) : (
          <>
            <Link to="/orders/me" style={styles.actionCard}>
              <ShoppingBag size={32} color="#2e7d32" />
              <h3>My Orders</h3>
              <p style={{ color: "#777", fontSize: "0.9rem" }}>
                Track your purchases from Plateau farmers.
              </p>
            </Link>
            <Link to="/products" style={styles.actionCard}>
              <MapPin size={32} color="#2e7d32" />
              <h3>Explore Local Produce</h3>
              <p style={{ color: "#777", fontSize: "0.9rem" }}>
                Find more fresh items near you.
              </p>
            </Link>
          </>
        )}
      </div>

      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <button
          onClick={() => navigate("/logout")}
          style={{
            background: "none",
            border: "1px solid #ff4d4d",
            color: "#ff4d4d",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            width: isMobile ? "100%" : "auto",
          }}
        >
          Logout Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
