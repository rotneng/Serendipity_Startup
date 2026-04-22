import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Tag,
  Info,
  Image as ImageIcon,
  PlusCircle,
  ArrowLeft,
  Scale,
} from "lucide-react";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    quantity: "",
    unit: "kg",
    image: "",
  });

  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Submitted:", productData);
  };

  const colors = {
    primary: "#1b5e20",
    secondary: "#2e7d32",
    background: "#f9fbf9",
    white: "#ffffff",
    border: "#e0e0e0",
  };

  const styles = {
    wrapper: {
      backgroundColor: colors.background,
      minHeight: "calc(100vh - 70px)",
      padding: "40px 5%",
      fontFamily: "sans-serif",
    },
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      backgroundColor: colors.white,
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
      overflow: "hidden",
    },
    header: {
      backgroundColor: colors.primary,
      padding: "30px",
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    form: { padding: "40px" },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "600",
      color: "#444",
      fontSize: "0.9rem",
    },
    inputGroup: { position: "relative", marginBottom: "25px" },
    icon: {
      position: "absolute",
      left: "12px",
      top: "38px",
      color: colors.secondary,
    },
    input: {
      width: "100%",
      padding: "12px 12px 12px 40px",
      border: `1px solid ${colors.border}`,
      borderRadius: "8px",
      fontSize: "1rem",
      outline: "none",
      boxSizing: "border-box",
    },
    textarea: {
      width: "100%",
      padding: "12px",
      border: `1px solid ${colors.border}`,
      borderRadius: "8px",
      fontSize: "1rem",
      minHeight: "120px",
      outline: "none",
      boxSizing: "border-box",
    },
    row: { display: "flex", gap: "20px", flexWrap: "wrap" },
    button: {
      backgroundColor: colors.secondary,
      color: "white",
      border: "none",
      padding: "15px 30px",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      width: "100%",
      marginTop: "10px",
    },
    backBtn: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      color: colors.secondary,
      textDecoration: "none",
      marginBottom: "20px",
      fontWeight: "600",
      cursor: "pointer",
      background: "none",
      border: "none",
    },
  };

  return (
    <div style={styles.wrapper}>
      <button onClick={() => navigate(-1)} style={styles.backBtn}>
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div style={styles.container}>
        <div style={styles.header}>
          <PlusCircle size={32} />
          <div>
            <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Add New Harvest</h1>
            <p style={{ margin: 0, opacity: 0.8, fontSize: "0.9rem" }}>
              Fill in the details to list your produce on the marketplace
            </p>
          </div>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Product Name</label>
            <Package size={18} style={styles.icon} />
            <input
              style={styles.input}
              type="text"
              placeholder="e.g., Irish Potatoes (Red variety)"
              required
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
            />
          </div>

          <div style={styles.row}>
            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>Price (₦)</label>
              <Tag size={18} style={styles.icon} />
              <input
                style={styles.input}
                type="number"
                placeholder="0.00"
                required
                onChange={(e) =>
                  setProductData({ ...productData, price: e.target.value })
                }
              />
            </div>

            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>Quantity Available</label>
              <Scale size={18} style={styles.icon} />
              <input
                style={styles.input}
                type="number"
                placeholder="e.g. 50"
                required
                onChange={(e) =>
                  setProductData({ ...productData, quantity: e.target.value })
                }
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Category</label>
            <select
              style={{ ...styles.input, paddingLeft: "12px" }}
              onChange={(e) =>
                setProductData({ ...productData, category: e.target.value })
              }
              required
            >
              <option value="">Select Category</option>
              <option value="tubers">Tubers (Potatoes, Yams)</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits (Strawberries, etc.)</option>
              <option value="grains">Grains</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              style={styles.textarea}
              placeholder="Tell buyers about the quality, harvest date, or organic practices..."
              onChange={(e) =>
                setProductData({ ...productData, description: e.target.value })
              }
            ></textarea>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Image URL</label>
            <ImageIcon size={18} style={styles.icon} />
            <input
              style={styles.input}
              type="text"
              placeholder="Paste image link here"
              onChange={(e) =>
                setProductData({ ...productData, image: e.target.value })
              }
            />
          </div>

          <button type="submit" style={styles.button}>
            Post Product to Marketplace
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
