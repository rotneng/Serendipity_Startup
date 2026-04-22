import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Actions/authActions";
import {
  Sprout,
  ShoppingCart,
  User,
  LogOut,
  PlusSquare,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
    navigate("/signin");
  };

  const colors = {
    primary: "#1b5e20",
    secondary: "#2e7d32",
    text: "#333",
    white: "#ffffff",
    danger: "#d63031",
    lightGreen: "#f1f8e9",
  };

  const styles = {
    nav: {
      position: "sticky",
      top: 0,
      zIndex: 2000,
      backgroundColor: colors.white,
      boxShadow: "0 2px 15px rgba(0,0,0,0.1)",
      height: "70px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 5%",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      textDecoration: "none",
      color: colors.primary,
      fontWeight: "800",
      fontSize: "1.4rem",
    },
    navLinks: {
      display: "flex",
      alignItems: "center",
      gap: "25px",
    },
    mobileMenu: {
      position: "absolute",
      top: "70px",
      left: 0,
      width: "100%",
      backgroundColor: colors.white,
      display: isOpen ? "flex" : "none",
      flexDirection: "column",
      padding: "20px 5%",
      boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
      borderTop: `1px solid ${colors.lightGreen}`,
      gap: "20px",
      zIndex: 1999,
    },
    link: {
      textDecoration: "none",
      color: colors.text,
      fontWeight: "600",
      fontSize: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    logoutBtn: {
      border: "none",
      background: "none",
      color: colors.danger,
      fontWeight: "600",
      fontSize: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
      padding: 0,
    },
    getStartedBtn: {
      backgroundColor: colors.secondary,
      color: "white",
      padding: "10px 20px",
      borderRadius: "8px",
      textAlign: "center",
      textDecoration: "none",
      fontWeight: "bold",
    },
  };

  return (
    <div style={{ position: "relative" }}>
      <nav style={styles.nav}>
        {/* Logo */}
        <Link to="/" style={styles.logo} onClick={() => setIsOpen(false)}>
          <Sprout size={30} />
          <span>Serendipity</span>
        </Link>

        {/* Hamburger Icon */}
        <div
          className="hamburger-icon"
          onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: "pointer", color: colors.primary }}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </div>

        {/* Desktop Links - FIXED SECTION */}
        <div className="desktop-links" style={styles.navLinks}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
          <Link to="/products" style={styles.link}>
            Marketplace
          </Link>

          {isAuthenticated ? (
            <>
              {user?.role === "farmer" && (
                <Link
                  to="/add-product"
                  style={{ ...styles.link, color: colors.secondary }}
                >
                  <PlusSquare size={20} /> Sell
                </Link>
              )}
              {user?.role === "consumer" && (
                <Link to="/cart" style={styles.link}>
                  <ShoppingCart size={20} /> Cart
                </Link>
              )}
              <Link to="/profile" style={styles.link}>
                <User size={20} /> {user?.name.split(" ")[0]}
              </Link>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                <LogOut size={20} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" style={styles.link}>
                Sign In
              </Link>
              <Link to="/signup" style={styles.getStartedBtn}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <div style={styles.mobileMenu}>
        <Link to="/" style={styles.link} onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link
          to="/products"
          style={styles.link}
          onClick={() => setIsOpen(false)}
        >
          Marketplace
        </Link>

        {isAuthenticated ? (
          <>
            {user?.role === "farmer" && (
              <Link
                to="/add-product"
                style={{ ...styles.link, color: colors.secondary }}
                onClick={() => setIsOpen(false)}
              >
                <PlusSquare size={18} /> Sell Produce
              </Link>
            )}
            {user?.role === "consumer" && (
              <Link
                to="/cart"
                style={styles.link}
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart size={18} /> Cart
              </Link>
            )}
            <Link
              to="/profile"
              style={styles.link}
              onClick={() => setIsOpen(false)}
            >
              <User size={18} /> My Profile
            </Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signin"
              style={styles.link}
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              style={styles.getStartedBtn}
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </>
        )}
      </div>

      <style>{`
        @media (min-width: 993px) {
          .hamburger-icon { display: none !important; }
          .desktop-links { display: flex !important; }
        }
        @media (max-width: 992px) {
          .desktop-links { display: none !important; }
          .hamburger-icon { display: block !important; }
        }
      `}</style>
    </div>
  );
};

export default Navbar;
