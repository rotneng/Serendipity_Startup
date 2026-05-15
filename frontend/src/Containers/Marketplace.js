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
} from "lucide-react";
import { getProducts } from "../Actions/productActions";
import { addItemsToCart } from "../Actions/cartActions";

const Marketplace = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showToast, setShowToast] = useState(false);

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
  const { products, loading, error } = productList || { products: [] };

  const { isAuthenticated } = useSelector((state) => state.auth || {});

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(getProducts(keyword));
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [keyword, dispatch]);

  const addToCartHandler = (id) => {
    if (!isAuthenticated) {
      alert("Please login to add items to cart");
      return navigate("/signin");
    }
    dispatch(addItemsToCart(id, 1));

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const filteredProducts = products?.filter((item) => {
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    return matchesCategory;
  });

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f9fbf9",
      fontFamily: "'Segoe UI', sans-serif",
      position: "relative",
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
      zIndex: 1000,
      transition: "right 0.3s ease-in-out",
      fontWeight: "600",
    },
    sidebar: {
      width: "260px",
      backgroundColor: "white",
      padding: "30px 20px",
      borderRight: "1px solid #eee",
      position: "sticky",
      top: 0,
      height: "100vh",
    },
    mainContent: { flex: 1, padding: "40px" },
    searchBox: {
      display: "flex",
      alignItems: "center",
      background: "#f1f3f1",
      padding: "10px 15px",
      borderRadius: "10px",
      marginBottom: "30px",
    },
    categoryItem: (isActive) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 15px",
      borderRadius: "8px",
      cursor: "pointer",
      backgroundColor: isActive ? "#2e7d32" : "transparent",
      color: isActive ? "white" : "#555",
      fontWeight: isActive ? "bold" : "500",
      transition: "0.2s",
      marginBottom: "5px",
    }),
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "25px",
    },
    card: {
      background: "white",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      transition: "transform 0.2s",
    },
    addToCartBtn: {
      padding: "8px",
      backgroundColor: "#e8f5e9",
      color: "#2e7d32",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "0.2s",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.toast}>
        <CheckCircle size={18} />
        Item added to cart!
      </div>

      <aside style={styles.sidebar}>
        <h3 style={{ marginBottom: "20px", color: "#2e7d32" }}>Categories</h3>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {categories.map((cat) => (
            <div
              key={cat}
              style={styles.categoryItem(activeCategory === cat)}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
              <ChevronRight
                size={16}
                opacity={activeCategory === cat ? 1 : 0.3}
              />
            </div>
          ))}
        </div>
      </aside>

      <main style={styles.mainContent}>
        <header style={{ marginBottom: "30px" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>
            Marketplace
          </h1>
          <div style={styles.searchBox}>
            <Search size={20} color="#666" />
            <input
              type="text"
              placeholder="Search all produce..."
              style={{
                border: "none",
                background: "none",
                outline: "none",
                flex: 1,
                padding: "0 15px",
                fontSize: "1rem",
              }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            {keyword && (
              <X
                size={18}
                style={{ cursor: "pointer" }}
                onClick={() => setKeyword("")}
              />
            )}
          </div>
        </header>

        {loading ? (
          <div style={{ textAlign: "center", marginTop: "100px" }}>
            <Loader2 size={40} className="animate-spin" color="#2e7d32" />
            <p>Loading fresh stock...</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <div
                  key={item._id}
                  style={styles.card}
                  className="product-card"
                >
                  <img
                    src={
                      item.images?.[0]?.url || "https://via.placeholder.com/400"
                    }
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ padding: "15px" }}>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        color: "#2e7d32",
                        textTransform: "uppercase",
                      }}
                    >
                      {item.category}
                    </span>
                    <h3 style={{ margin: "5px 0", fontSize: "1.1rem" }}>
                      {item.name}
                    </h3>
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "0.85rem",
                        color: "#666",
                      }}
                    >
                      <MapPin size={14} /> {item.location || "Plateau"}
                    </p>
                    <div
                      style={{
                        marginTop: "15px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                        ₦{item.price?.toLocaleString()}
                      </span>

                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          style={styles.addToCartBtn}
                          title="Quick Add"
                          onClick={() => addToCartHandler(item._id)}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.backgroundColor = "#c8e6c9")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.backgroundColor = "#e8f5e9")
                          }
                        >
                          <ShoppingCart size={18} />
                        </button>

                        <Link to={`/product/${item._id}`}>
                          <button
                            style={{
                              padding: "8px 15px",
                              backgroundColor: "#2e7d32",
                              color: "white",
                              border: "none",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                          >
                            Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div
                style={{
                  gridColumn: "1/-1",
                  textAlign: "center",
                  padding: "50px",
                }}
              >
                <p>No products found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Marketplace;
