import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Search,
  Loader2,
  X,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";
import { getProducts } from "../Actions/productActions";
import { addItemsToCart } from "../Actions/cartActions";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [showToast, setShowToast] = useState(false);

  const auth = useSelector((state) => state.auth);
  const { user, isAuthenticated } = auth;

  const productList = useSelector((state) => state.productReducer);
  const { products, loading, error } = productList || { products: [] };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(getProducts(keyword));
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [keyword, dispatch]);

  const clearSearch = () => setKeyword("");

  const handleAddToCart = (id) => {
    if (!isAuthenticated) {
      return navigate("/signin");
    }
    dispatch(addItemsToCart(id, 1));

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#333",
      position: "relative",
    },
    toast: {
      position: "fixed",
      top: "20px",
      right: showToast ? "20px" : "-300px",
      backgroundColor: "#2e7d32",
      color: "white",
      padding: "15px 25px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      zIndex: 1000,
      transition: "right 0.5s ease-in-out",
      fontWeight: "bold",
    },
    hero: {
      height: "60vh",
      background:
        'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1600") center/cover',
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      textAlign: "center",
      padding: "0 20px",
    },
    searchBar: {
      display: "flex",
      alignItems: "center",
      background: "white",
      padding: "5px",
      borderRadius: "50px",
      width: "100%",
      maxWidth: "600px",
      marginTop: "30px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
    input: {
      flex: 1,
      border: "none",
      padding: "12px 20px",
      borderRadius: "50px",
      outline: "none",
      fontSize: "1rem",
      color: "#333",
    },
    section: { padding: "60px 10%", backgroundColor: "#f9fbf9" },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "25px",
      marginTop: "30px",
    },
    card: {
      background: "white",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
      transition: "0.3s",
    },
    cardContent: { padding: "15px" },
    badge: {
      backgroundColor: "#e8f5e9",
      color: "#2e7d32",
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "0.8rem",
      fontWeight: "bold",
    },
    btnContainer: { display: "flex", gap: "10px", marginTop: "10px" },
    viewBtn: {
      flex: 1,
      padding: "10px",
      backgroundColor: "#f0f0f0",
      color: "#333",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      textAlign: "center",
      textDecoration: "none",
      fontSize: "0.9rem",
    },
    cartBtn: {
      flex: 1,
      padding: "10px",
      backgroundColor: "#2e7d32",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px",
      fontSize: "0.9rem",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.toast}>
        <CheckCircle size={20} />
        Added to Cart!
      </div>

      <section style={styles.hero}>
        <h1 style={{ fontSize: "3.5rem", marginBottom: "10px" }}>
          {isAuthenticated
            ? `Welcome, ${user?.name}!`
            : "Fresh from the Plateau"}
        </h1>
        <p style={{ fontSize: "1.2rem", maxWidth: "700px" }}>
          Connecting Plateau State farmers directly with consumers.
        </p>
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Type produce..."
            style={styles.input}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {keyword && (
            <button
              onClick={clearSearch}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0 10px",
              }}
            >
              <X size={20} color="#666" />
            </button>
          )}
          <div style={{ paddingRight: "20px", color: "#2e7d32" }}>
            <Search size={22} />
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <h2>{keyword ? `Results for "${keyword}"` : "Featured Produce"}</h2>
        {loading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <Loader2
              size={40}
              className="animate-spin"
              style={{ color: "#2e7d32" }}
            />
          </div>
        ) : (
          <div style={styles.grid}>
            {products && products.length > 0 ? (
              (keyword ? products : products.slice(0, 6)).map((item) => (
                <div key={item._id} style={styles.card}>
                  <img
                    src={
                      item.images?.[0]?.url || "https://via.placeholder.com/400"
                    }
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={styles.cardContent}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <span style={styles.badge}>{item.category}</span>
                      <span style={{ fontWeight: "bold", color: "#2e7d32" }}>
                        ₦{item.price?.toLocaleString()}
                      </span>
                    </div>
                    <h3 style={{ marginBottom: "5px" }}>{item.name}</h3>
                    <div style={styles.btnContainer}>
                      <Link to={`/product/${item._id}`} style={styles.viewBtn}>
                        Details
                      </Link>
                      <button
                        style={styles.cartBtn}
                        onClick={() => handleAddToCart(item._id)}
                        disabled={item.stockQuantity < 1}
                      >
                        <ShoppingCart size={16} />{" "}
                        {item.stockQuantity < 1 ? "Out" : "Add"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
