import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../Actions/productActions";
import { addItemsToCart } from "../Actions/cartActions";
import {
  MapPin,
  Package,
  Phone,
  ArrowLeft,
  Loader2,
  ShoppingCart,
  Plus,
  Minus,
  CheckCircle,
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const productState = useSelector(
    (state) => state.productReducer || state.productDetails,
  );
  const { loading, error, product } = productState || {};

  const { isAuthenticated } = useSelector(
    (state) => state.auth || state.user || {},
  );

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);

  const increaseQty = () => {
    if (product.stockQuantity <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (1 >= quantity) return;
    setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      return navigate("/signin");
    }
    dispatch(addItemsToCart(product._id, quantity));

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const styles = {
    container: {
      padding: "40px 10%",
      backgroundColor: "#f9fbf9",
      minHeight: "100vh",
      position: "relative",
    },
    toast: {
      position: "fixed",
      top: "30px",
      right: showToast ? "30px" : "-400px",
      backgroundColor: "#2e7d32",
      color: "white",
      padding: "16px 24px",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      zIndex: 2000,
      transition: "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      fontWeight: "600",
    },
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Loader2 className="animate-spin" size={40} color="#2e7d32" />
        <p style={{ color: "#2e7d32", fontWeight: "600" }}>
          Loading fresh produce...
        </p>
      </div>
    );
  }

  if (error)
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "#d32f2f" }}>
        <h3>Oops! {error}</h3>
        <Link to="/" style={{ color: "#2e7d32", fontWeight: "bold" }}>
          Return to Market
        </Link>
      </div>
    );
  if (!product || Object.keys(product).length === 0)
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h3>Product not found.</h3>
        <Link to="/" style={{ color: "#2e7d32", fontWeight: "bold" }}>
          Back to Market
        </Link>
      </div>
    );

  return (
    <div style={styles.container}>
      <div style={styles.toast}>
        <CheckCircle size={22} />
        <div>
          <div style={{ fontSize: "1rem" }}>Added to Cart!</div>
          <div style={{ fontSize: "0.8rem", opacity: 0.9, fontWeight: "400" }}>
            {quantity} x {product.name}
          </div>
        </div>
      </div>

      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          color: "#2e7d32",
          textDecoration: "none",
          marginBottom: "20px",
          fontWeight: "600",
        }}
      >
        <ArrowLeft size={18} /> Back to Market
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(300px, 1fr) 1fr",
          gap: "40px",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <img
            src={
              product.images?.[selectedImage]?.url ||
              "https://via.placeholder.com/400"
            }
            alt={product.name}
            style={{
              width: "100%",
              height: "450px",
              objectFit: "cover",
              borderRadius: "12px",
              border: "1px solid #f0f0f0",
            }}
          />
          <div
            style={{
              display: "flex",
              gap: "12px",
              overflowX: "auto",
              paddingBottom: "5px",
            }}
          >
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt="Thumb"
                onClick={() => setSelectedImage(index)}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  objectFit: "cover",
                  border:
                    selectedImage === index
                      ? "3px solid #2e7d32"
                      : "1px solid #ddd",
                }}
              />
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          <div>
            <span
              style={{
                backgroundColor: "#e8f5e9",
                color: "#2e7d32",
                padding: "6px 16px",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: "bold",
              }}
            >
              {product.category}
            </span>
            <h1
              style={{
                fontSize: "2.8rem",
                margin: "10px 0 5px 0",
                color: "#1a1a1a",
              }}
            >
              {product.name}
            </h1>
            <div
              style={{ display: "flex", alignItems: "baseline", gap: "15px" }}
            >
              <span
                style={{
                  fontSize: "2.2rem",
                  fontWeight: "800",
                  color: "#2e7d32",
                }}
              >
                ₦{Number(product.price).toLocaleString()}
              </span>
              <span
                style={{
                  color: product.stockQuantity > 0 ? "#777" : "#d32f2f",
                  fontSize: "1.1rem",
                }}
              >
                |{" "}
                {product.stockQuantity > 0
                  ? `${product.stockQuantity} units available`
                  : "Out of Stock"}
              </span>
            </div>
          </div>

          <p
            style={{
              color: "#555",
              lineHeight: "1.8",
              margin: 0,
              borderTop: "1px solid #eee",
              paddingTop: "20px",
            }}
          >
            {product.description}
          </p>

          {product.stockQuantity > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #eee",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <span style={{ fontWeight: "bold" }}>Quantity:</span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                  }}
                >
                  <button
                    onClick={decreaseQty}
                    style={{
                      padding: "8px 12px",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Minus size={16} />
                  </button>
                  <span
                    style={{
                      padding: "0 15px",
                      fontWeight: "bold",
                      minWidth: "30px",
                      textAlign: "center",
                    }}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQty}
                    style={{
                      padding: "8px 12px",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                style={{
                  width: "100%",
                  padding: "18px",
                  backgroundColor: "#2e7d32",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  boxShadow: "0 4px 15px rgba(46, 125, 50, 0.2)",
                }}
              >
                <ShoppingCart size={22} /> Add to Cart
              </button>
            </div>
          )}
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f1f8f1",
              borderRadius: "14px",
              border: "1px dashed #2e7d32",
            }}
          >
            <h4 style={{ margin: "0 0 10px 0", color: "#2e7d32" }}>
              Farmer Contact
            </h4>
            <p style={{ margin: "5px 0" }}>
              <strong>Name:</strong> {product.farmer?.name || "Local Farmer"}
            </p>
            <button
              onClick={() => window.open(`tel:${product.farmer?.phoneNumber}`)}
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "12px",
                backgroundColor: "white",
                color: "#2e7d32",
                border: "2px solid #2e7d32",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <Phone size={18} /> Call Farmer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
