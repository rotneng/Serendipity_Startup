import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MapPin, Search, Loader2, X } from "lucide-react";
import { getProducts } from "../Actions/productActions";

const Home = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

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

  const clearSearch = () => {
    setKeyword("");
  };

  const styles = {
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#333",
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
    searchBtn: {
      backgroundColor: "#2e7d32",
      border: "none",
      borderRadius: "50px",
      padding: "10px 25px",
      color: "white",
      cursor: "pointer",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      gap: "8px",
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
  };

  return (
    <div style={styles.container}>
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
            placeholder="Type to find Irish potatoes, tomatoes, strawberries..."
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>{keyword ? `Results for "${keyword}"` : "Featured Produce"}</h2>
          {!keyword && (
            <Link
              to="/products"
              style={{
                color: "#2e7d32",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              View All
            </Link>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <Loader2
              size={40}
              className="animate-spin"
              style={{ color: "#2e7d32" }}
            />
            <p>Fetching fresh harvests...</p>
          </div>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
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
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "#666",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <MapPin size={14} /> {item.location || "Plateau State"}
                    </p>
                    <Link
                      to={`/product/${item._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <button
                        style={{
                          width: "100%",
                          padding: "10px",
                          backgroundColor: "#2e7d32",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  textAlign: "center",
                  gridColumn: "1 / -1",
                  padding: "40px",
                }}
              >
                <p>No products found matching "{keyword}".</p>
                <button
                  onClick={clearSearch}
                  style={{
                    color: "#2e7d32",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontWeight: "bold",
                    marginTop: "10px",
                  }}
                >
                  Clear search to see all harvests
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {user?.role === "farmer" && (
        <section
          style={{
            ...styles.section,
            backgroundColor: "#2e7d32",
            color: "white",
            textAlign: "center",
          }}
        >
          <h2>Have a new harvest?</h2>
          <p>
            List your products now and reach thousands of buyers across Nigeria.
          </p>
          <Link to="/add-product">
            <button
              style={{
                ...styles.searchBtn,
                backgroundColor: "white",
                color: "#2e7d32",
                marginTop: "20px",
                marginInline: "auto",
              }}
            >
              Upload Product
            </button>
          </Link>
        </section>
      )}
    </div>
  );
};

export default Home;
