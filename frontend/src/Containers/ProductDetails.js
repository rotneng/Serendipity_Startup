import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../Actions/productActions";
import { MapPin, Package, Phone, ArrowLeft, Loader2 } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(0);

  const productState = useSelector(
    (state) => state.productReducer || state.productDetails,
  );
  const { loading, error, product } = productState || {};

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, id]);

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

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "#d32f2f" }}>
        <h3>Oops! {error}</h3>
        <Link to="/" style={{ color: "#2e7d32", fontWeight: "bold" }}>
          Return to Market
        </Link>
      </div>
    );
  }

  if (!product || Object.keys(product).length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h3>Product not found.</h3>
        <p>The item may have been removed or the ID is incorrect.</p>
        <Link to="/" style={{ color: "#2e7d32", fontWeight: "bold" }}>
          Back to Market
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "40px 10%",
        backgroundColor: "#f9fbf9",
        minHeight: "100vh",
      }}
    >
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
              "https://via.placeholder.com/400?text=No+Image+Available"
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
                alt={`Thumbnail ${index}`}
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
                  transition: "all 0.2s ease",
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
                textTransform: "uppercase",
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
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: "15px" }}>
            <span
              style={{
                fontSize: "2.2rem",
                fontWeight: "800",
                color: "#2e7d32",
              }}
            >
              ₦{Number(product.price).toLocaleString()}
            </span>
            <span style={{ color: "#777", fontSize: "1.1rem" }}>
              |{" "}
              {product.stockQuantity > 0
                ? `${product.stockQuantity} units available`
                : "Out of Stock"}
            </span>
          </div>

          <div
            style={{
              borderTop: "1px solid #eee",
              borderBottom: "1px solid #eee",
              padding: "20px 0",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0", fontSize: "1.1rem" }}>
              Description
            </h3>
            <p style={{ color: "#555", lineHeight: "1.8", margin: 0 }}>
              {product.description}
            </p>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#444",
              }}
            >
              <MapPin size={20} color="#2e7d32" />
              <strong>Location:</strong> {product.location}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#444",
              }}
            >
              <Package size={20} color="#2e7d32" />
              <strong>Category:</strong> {product.category}
            </div>
          </div>

          <div
            style={{
              marginTop: "10px",
              padding: "25px",
              backgroundColor: "#f1f8f1",
              borderRadius: "14px",
              border: "1px dashed #2e7d32",
            }}
          >
            <h4
              style={{
                margin: "0 0 15px 0",
                color: "#2e7d32",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Farmer Information
            </h4>
            <div style={{ marginBottom: "15px" }}>
              <p style={{ margin: "5px 0" }}>
                <strong>Name:</strong>{" "}
                {product.farmer?.name || "Local Plateau Farmer"}
              </p>
              <p style={{ margin: "5px 0" }}>
                <strong>Phone:</strong>{" "}
                {product.farmer?.phoneNumber || "Not provided"}
              </p>
            </div>

            <button
              style={{
                width: "100%",
                padding: "16px",
                backgroundColor: "#2e7d32",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                transition: "background 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#1b5e20")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#2e7d32")}
              onClick={() => window.open(`tel:${product.farmer?.phoneNumber}`)}
            >
              <Phone size={20} /> Contact Farmer Directly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
