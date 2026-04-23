import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../Actions/productActions";
import {
  Package,
  Tag,
  PlusCircle,
  Scale,
  Loader2,
  CheckCircle2,
  AlertCircle,
  LayoutGrid,
  AlignLeft,
  MapPin,
} from "lucide-react";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stockQuantity: "",
    location: "",
    image: "",
    public_id: "",
  });

  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productCreate = useSelector((state) => state.product);
  const { loading, error, success } = productCreate || {};

  useEffect(() => {
    if (success) {
      alert("Product listed successfully!");
      navigate("/");
    }
  }, [success, navigate]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "serendipity_preset");
    const cloudName = "dfyxnv967";

    try {
      const resp = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: data },
      );

      const res = await resp.json();

      if (resp.ok) {
        setProductData((prev) => ({
          ...prev,
          image: res.secure_url,
          public_id: res.public_id,
        }));
        setUploading(false);
      } else {
        alert(res.error?.message || "Upload failed");
        setUploading(false);
      }
    } catch (err) {
      setUploading(false);
      alert("Cloudinary connection error.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productData.image) return alert("Please upload an image first!");

    const finalData = {
      ...productData,
      price: Number(productData.price),
      stockQuantity: Number(productData.stockQuantity),
    };

    dispatch(addProduct(finalData));
  };

  const colors = {
    primary: "#1b5e20",
    secondary: "#2e7d32",
    background: "#f9fbf9",
    white: "#ffffff",
    border: "#e0e0e0",
    error: "#d32f2f",
  };

  const styles = {
    wrapper: {
      backgroundColor: colors.background,
      minHeight: "100vh",
      padding: "40px 5%",
    },
    container: {
      maxWidth: "700px",
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
      zIndex: 1,
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
      padding: "12px 12px 12px 40px",
      border: `1px solid ${colors.border}`,
      borderRadius: "8px",
      fontSize: "1rem",
      outline: "none",
      boxSizing: "border-box",
      minHeight: "100px",
      fontFamily: "inherit",
    },
    select: {
      width: "100%",
      padding: "12px 12px 12px 40px",
      border: `1px solid ${colors.border}`,
      borderRadius: "8px",
      fontSize: "1rem",
      backgroundColor: "white",
      cursor: "pointer",
    },
    fileInput: {
      padding: "10px",
      border: `2px dashed ${colors.border}`,
      borderRadius: "8px",
      width: "100%",
      cursor: "pointer",
    },
    imagePreview: {
      width: "100px",
      height: "100px",
      objectFit: "cover",
      borderRadius: "8px",
      border: `1px solid ${colors.border}`,
    },
    button: {
      backgroundColor: colors.secondary,
      color: "white",
      border: "none",
      padding: "15px",
      borderRadius: "8px",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      width: "100%",
      opacity: uploading || loading ? 0.7 : 1,
    },
    errorBox: {
      backgroundColor: "#ffebee",
      color: colors.error,
      padding: "15px",
      borderRadius: "8px",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <PlusCircle size={32} />
          <div>
            <h1 style={{ margin: 0, fontSize: "1.5rem" }}>Add Product</h1>
            <p style={{ margin: 0, opacity: 0.8 }}>
              Upload your fresh harvest to the market
            </p>
          </div>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          {error && (
            <div style={styles.errorBox}>
              <AlertCircle size={20} /> {error}
            </div>
          )}

          <div style={styles.inputGroup}>
            <label style={styles.label}>Product Name</label>
            <Package size={18} style={styles.icon} />
            <input
              style={styles.input}
              type="text"
              placeholder="e.g. Fresh Red Strawberries"
              required
              value={productData.name}
              onChange={(e) =>
                setProductData({ ...productData, name: e.target.value })
              }
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Category</label>
            <LayoutGrid size={18} style={styles.icon} />
            <select
              style={styles.select}
              required
              value={productData.category}
              onChange={(e) =>
                setProductData({ ...productData, category: e.target.value })
              }
            >
              <option value="">Select a category</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Tubers">Tubers</option>
              <option value="Grains">Grains</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "15px" }}>
            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>Price (₦)</label>
              <Tag size={18} style={styles.icon} />
              <input
                style={styles.input}
                type="number"
                placeholder="5000"
                required
                value={productData.price}
                onChange={(e) =>
                  setProductData({ ...productData, price: e.target.value })
                }
              />
            </div>
            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>Stock Quantity</label>
              <Scale size={18} style={styles.icon} />
              <input
                style={styles.input}
                type="number"
                placeholder="Number of units"
                required
                value={productData.stockQuantity}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    stockQuantity: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Farm/Product Location</label>
            <MapPin size={18} style={styles.icon} />
            <input
              style={styles.input}
              type="text"
              placeholder="e.g. Jos, Plateau State"
              required
              value={productData.location}
              onChange={(e) =>
                setProductData({ ...productData, location: e.target.value })
              }
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Description</label>
            <AlignLeft size={18} style={styles.icon} />
            <textarea
              style={styles.textarea}
              placeholder="Tell buyers about your produce..."
              required
              value={productData.description}
              onChange={(e) =>
                setProductData({ ...productData, description: e.target.value })
              }
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Product Image</label>
            <input
              type="file"
              accept="image/*"
              style={styles.fileInput}
              onChange={handleImageUpload}
              disabled={uploading}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginTop: "15px",
              }}
            >
              {preview && (
                <img src={preview} alt="Preview" style={styles.imagePreview} />
              )}
              {uploading && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    color: colors.secondary,
                  }}
                >
                  <Loader2 size={20} className="animate-spin" />
                  <span>Uploading to Cloudinary...</span>
                </div>
              )}
              {!uploading && productData.image && (
                <div
                  style={{
                    color: "#2e7d32",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <CheckCircle2 size={20} /> <span>Image Secured!</span>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            style={styles.button}
            disabled={uploading || loading}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <PlusCircle size={20} />
            )}
            {loading ? "Saving to Database..." : "List Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
