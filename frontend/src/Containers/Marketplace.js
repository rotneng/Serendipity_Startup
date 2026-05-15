import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Search,
  Loader2,
  X,
  ChevronRight,
  ShoppingCart,
  CheckCircle,
  Menu,
} from "lucide-react";
import { getProducts } from "../Actions/productActions";
import { addItemsToCart } from "../Actions/cartActions";

const Marketplace = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showToast, setShowToast] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = [
    "All",
    "Vegetables",
    "Fruits",
    "Grains",
    "Tubers",
    "Livestock",
    "Other",
  ];

  const productList = useSelector((state) => state.productReducer);
  const { products, loading } = productList || { products: [] };
  const { isAuthenticated } = useSelector((state) => state.auth || {});

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(getProducts(keyword));
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [keyword, dispatch]);

  const addToCartHandler = (id) => {
    if (!isAuthenticated) return navigate("/signin");
    dispatch(addItemsToCart(id, 1));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const filteredProducts = products?.filter(
    (item) => activeCategory === "All" || item.category === activeCategory,
  );

  const styles = {
    container: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      minHeight: "100vh",
      backgroundColor: "#f9fbf9",
      fontFamily: "'Segoe UI', sans-serif",
    },
    toast: {
      position: "fixed",
      top: "20px",
      right: showToast ? "20px" : "-300px",
      backgroundColor: "#2e7d32",
      color: "white",
      padding: "12px 20px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      zIndex: 2000,
      transition: "0.3s ease-in-out",
    },
    sidebar: {
      width: isMobile ? "100%" : "260px",
      backgroundColor: "white",
      padding: isMobile ? "15px" : "30px 20px",
      borderRight: isMobile ? "none" : "1px solid #eee",
      borderBottom: isMobile ? "1px solid #eee" : "none",
      position: isMobile ? "relative" : "sticky",
      top: 0,
      height: isMobile ? "auto" : "100vh",
      zIndex: 10,
    },
    categoryList: {
      display: "flex",
      flexDirection: isMobile ? "row" : "column",
      overflowX: isMobile ? "auto" : "visible",
      whiteSpace: "nowrap",
      gap: "10px",
      paddingBottom: isMobile ? "10px" : "0",
    },
    categoryItem: (isActive) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: isMobile ? "8px 15px" : "12px 15px",
      borderRadius: "8px",
      cursor: "pointer",
      backgroundColor: isActive ? "#2e7d32" : "#f1f3f1",
      color: isActive ? "white" : "#555",
      fontWeight: "600",
      transition: "0.2s",
      flexShrink: 0,
    }),
    mainContent: {
      flex: 1,
      padding: isMobile ? "20px" : "40px",
      width: "100%",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", // Smaller minimum for mobile
      gap: isMobile ? "15px" : "25px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.toast}>
        <CheckCircle size={18} /> Item added to cart!
      </div>

      <aside style={styles.sidebar}>
        <h3
          style={{
            marginBottom: isMobile ? "10px" : "20px",
            color: "#2e7d32",
            fontSize: isMobile ? "1.1rem" : "1.3rem",
          }}
        >
          {isMobile ? "Filter by Category" : "Categories"}
        </h3>
        <div style={styles.categoryList} className="no-scrollbar">
          {categories.map((cat) => (
            <div
              key={cat}
              style={styles.categoryItem(activeCategory === cat)}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
              {!isMobile && (
                <ChevronRight
                  size={16}
                  opacity={activeCategory === cat ? 1 : 0.3}
                />
              )}
            </div>
          ))}
        </div>
      </aside>

      <main style={styles.mainContent}>
        <header style={{ marginBottom: "20px" }}>
          <h1
            style={{
              fontSize: isMobile ? "1.5rem" : "2.5rem",
              marginBottom: "10px",
            }}
          >
            Marketplace
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "white",
              padding: "12px 15px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <Search size={20} color="#666" />
            <input
              type="text"
              placeholder="Search local produce..."
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                padding: "0 10px",
                fontSize: "1rem",
              }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </header>

        {loading ? (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <Loader2 size={40} className="animate-spin" color="#2e7d32" />
          </div>
        ) : (
          <div style={styles.grid}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <div
                  key={item._id}
                  style={{
                    background: "white",
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                  }}
                >
                  <img
                    src={
                      item.images?.[0]?.url || "https://via.placeholder.com/400"
                    }
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: isMobile ? "140px" : "180px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ padding: isMobile ? "10px" : "15px" }}>
                    <h3
                      style={{
                        fontSize: isMobile ? "0.95rem" : "1.1rem",
                        margin: "0 0 5px 0",
                      }}
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{
                        color: "#666",
                        fontSize: "0.8rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                    >
                      <MapPin size={12} /> {item.location || "Plateau"}
                    </p>
                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontWeight: "bold", color: "#2e7d32" }}>
                        ₦{item.price}
                      </span>
                      <button
                        onClick={() => addToCartHandler(item._id)}
                        style={{
                          padding: "8px",
                          background: "#e8f5e9",
                          border: "none",
                          borderRadius: "8px",
                          color: "#2e7d32",
                          cursor: "pointer",
                        }}
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  gridColumn: "1/-1",
                  textAlign: "center",
                  padding: "40px",
                }}
              >
                No items found.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Marketplace;
