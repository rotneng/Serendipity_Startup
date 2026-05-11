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
  AlertCircle,
  LayoutGrid,
  AlignLeft,
  MapPin,
  Image as ImageIcon,
  X,
} from "lucide-react";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stockQuantity: "",
    location: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState([]);

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
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
    setUploading(true);

    const cloudName = "dfyxnv967";
    const uploadPreset = "serendipity_preset";
    const uploadedImageData = [];

    try {
      for (const file of files) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", uploadPreset);

        const resp = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: data },
        );

        const res = await resp.json();

        if (resp.ok) {
          uploadedImageData.push({
            url: res.secure_url,
            public_id: res.public_id,
          });
        }
      }

      setProductData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedImageData],
      }));
      setUploading(false);
    } catch (err) {
      setUploading(false);
      alert("Error uploading images to Cloudinary.");
    }
  };

  const removeImage = (index) => {
    setProductData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productData.images.length === 0)
      return alert("Please upload at least one image!");

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
    fileInputContainer: {
      border: `2px dashed ${colors.border}`,
      borderRadius: "8px",
      padding: "20px",
      textAlign: "center",
      cursor: "pointer",
      position: "relative",
    },
    previewGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
      gap: "10px",
      marginTop: "15px",
    },
    previewItem: {
      position: "relative",
      width: "100%",
      aspectRatio: "1/1",
      borderRadius: "8px",
      overflow: "hidden",
      border: `1px solid ${colors.border}`,
    },
    previewImg: { width: "100%", height: "100%", objectFit: "cover" },
    removeBtn: {
      position: "absolute",
      top: "4px",
      right: "4px",
      backgroundColor: colors.error,
      color: "white",
      border: "none",
      borderRadius: "50%",
      cursor: "pointer",
      padding: "4px",
      display: "flex",
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
              Showcase your harvest with multiple photos
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
              placeholder="e.g. Ogbomosho Mangoes"
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
            <label style={styles.label}>Location</label>
            <MapPin size={18} style={styles.icon} />
            <input
              style={styles.input}
              type="text"
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
              required
              value={productData.description}
              onChange={(e) =>
                setProductData({ ...productData, description: e.target.value })
              }
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Product Gallery</label>
            <div style={styles.fileInputContainer}>
              <ImageIcon
                size={24}
                style={{ color: colors.secondary, marginBottom: "8px" }}
              />
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                style={{
                  opacity: 0,
                  position: "absolute",
                  inset: 0,
                  cursor: "pointer",
                }}
              />
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#666" }}>
                Select multiple photos of your product
              </p>
            </div>

            <div style={styles.previewGrid}>
              {previews.map((src, index) => (
                <div key={index} style={styles.previewItem}>
                  <img src={src} alt="preview" style={styles.previewImg} />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    style={styles.removeBtn}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            {uploading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "10px",
                  color: colors.secondary,
                }}
              >
                <Loader2 size={18} className="animate-spin" />
                <span style={{ fontSize: "0.85rem" }}>Uploading images...</span>
              </div>
            )}
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
            {loading ? "Listing Product..." : "Add Product to Market"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
