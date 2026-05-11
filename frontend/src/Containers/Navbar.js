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
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      height: "75px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 6%",
      transition: "all 0.3s ease",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      textDecoration: "none",
      color: colors.primary,
      fontWeight: "800",
      fontSize: "1.5rem",
      transition: "transform 0.2s ease",
    },
    navLinks: {
      display: "flex",
      alignItems: "center",
      gap: "30px",
    },
    mobileMenu: {
      position: "absolute",
      top: "75px",
      left: 0,
      width: "100%",
      backgroundColor: colors.white,
      display: isOpen ? "flex" : "none",
      flexDirection: "column",
      padding: "30px 6%",
      boxShadow: "0 15px 30px rgba(0,0,0,0.08)",
      borderTop: `1px solid ${colors.lightGreen}`,
      gap: "20px",
      zIndex: 1999,
      transform: isOpen ? "translateY(0)" : "translateY(-10px)",
      opacity: isOpen ? 1 : 0,
      transition: "all 0.3s ease-in-out",
    },
    link: {
      textDecoration: "none",
      color: colors.text,
      fontWeight: "600",
      fontSize: "0.95rem",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.2s ease",
      position: "relative",
    },
    logoutBtn: {
      border: "none",
      background: "none",
      color: colors.danger,
      fontWeight: "600",
      fontSize: "0.95rem",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
      padding: "8px 12px",
      borderRadius: "6px",
      transition: "background 0.2s ease",
    },
    getStartedBtn: {
      backgroundColor: colors.secondary,
      color: "white",
      padding: "12px 24px",
      borderRadius: "10px",
      textAlign: "center",
      textDecoration: "none",
      fontWeight: "bold",
      boxShadow: `0 4px 14px rgba(46, 125, 50, 0.3)`,
      transition: "all 0.3s ease",
    },
  };

  return (
    <div style={{ position: "relative" }}>
      <nav style={styles.nav}>
        <Link
          to="/"
          style={styles.logo}
          onClick={() => setIsOpen(false)}
          className="nav-logo"
        >
          <Sprout size={32} strokeWidth={2.5} />
          <span style={{ letterSpacing: "-0.5px" }}>Serendipity</span>
        </Link>

        <div
          className="hamburger-icon"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            cursor: "pointer",
            color: colors.primary,
            transition: "transform 0.3s ease",
          }}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </div>

        <div className="desktop-links" style={styles.navLinks}>
          <Link to="/" className="nav-item" style={styles.link}>
            Home
          </Link>
          <Link to="/products" className="nav-item" style={styles.link}>
            Marketplace
          </Link>

          {isAuthenticated ? (
            <>
              {user?.role === "farmer" && (
                <Link
                  to="/add-product"
                  className="nav-item-special"
                  style={{ ...styles.link, color: colors.secondary }}
                >
                  <PlusSquare size={20} /> Sell
                </Link>
              )}
              {user?.role === "consumer" && (
                <Link to="/cart" className="nav-item" style={styles.link}>
                  <ShoppingCart size={20} /> Cart
                </Link>
              )}
              <Link to="/profile" className="nav-item" style={styles.link}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: colors.lightGreen,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "4px",
                  }}
                >
                  <User size={18} />
                </div>
                {user?.name.split(" ")[0]}
              </Link>
              <button
                onClick={handleLogout}
                style={styles.logoutBtn}
                className="logout-hover"
              >
                <LogOut size={20} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="nav-item" style={styles.link}>
                Sign In
              </Link>
              <Link
                to="/signup"
                style={styles.getStartedBtn}
                className="get-started-hover"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

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

        /* Hover Animations */
        .nav-item:hover {
          color: ${colors.secondary} !important;
          transform: translateY(-2px);
        }

        .nav-logo:hover {
          transform: scale(1.05);
        }

        .get-started-hover:hover {
          background-color: ${colors.primary} !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(46, 125, 50, 0.4) !important;
        }

        .logout-hover:hover {
          background-color: #fff5f5 !important;
        }

        .nav-item::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: ${colors.secondary};
          transition: width 0.3s ease;
        }

        .nav-item:hover::after {
          width: 100%;
        }

        .hamburger-icon:active {
          transform: scale(0.9);
        }
      `}</style>
    </div>
  );
};

export default Navbar;
