import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import {
  getCart,
  updateCartQuantity,
  removeItemsFromCart,
} from "../Actions/cartActions";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const { cart, loading } = useSelector((state) => state.cartState) || {};
  const { token } = useSelector((state) => state.auth) || {};
  const cartItems = cart?.cartItems || [];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getCart());
    }
  }, [dispatch, token]);

  const increaseQty = (e, productId, currentQty, stock) => {
    e.preventDefault();
    if (currentQty >= stock) return;
    dispatch(updateCartQuantity(productId, currentQty + 1));
  };

  const decreaseQty = (e, productId, currentQty) => {
    e.preventDefault();
    if (currentQty <= 1) return;
    dispatch(updateCartQuantity(productId, currentQty - 1));
  };

  const deleteCartItem = (e, productId) => {
    e.preventDefault();
    dispatch(removeItemsFromCart(productId));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * (item.product?.price || 0),
    0,
  );

  const styles = {
    wrapper: {
      padding: isMobile ? "20px 5%" : "40px 10%",
      backgroundColor: "#f9fbf9",
      minHeight: "100vh",
    },
    mainLayout: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 350px",
      gap: isMobile ? "20px" : "40px",
    },
    cartItem: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      marginBottom: "15px",
      alignItems: isMobile ? "flex-start" : "center",
      gap: "20px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      position: "relative",
    },
    image: {
      width: isMobile ? "100%" : "80px",
      height: isMobile ? "150px" : "80px",
      borderRadius: "8px",
      objectFit: "cover",
    },
    qtyControls: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: "#f0f0f0",
      padding: "5px 10px",
      borderRadius: "8px",
      alignSelf: isMobile ? "flex-end" : "center",
    },
    priceTag: {
      width: isMobile ? "auto" : "120px",
      textAlign: isMobile ? "left" : "right",
      fontSize: "1.1rem",
      color: "#2e7d32",
      fontWeight: "bold",
    },
    deleteBtn: {
      position: isMobile ? "absolute" : "static",
      top: "15px",
      right: "15px",
      color: "#ff4d4f",
      border: "none",
      background: "none",
      cursor: "pointer",
    },
  };

  if (loading && cartItems.length === 0) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "100px" }}
      >
        <Loader2 className="animate-spin" size={40} color="#2e7d32" />
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <Link
        to="/products"
        style={{
          textDecoration: "none",
          color: "#2e7d32",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          marginBottom: "20px",
        }}
      >
        <ArrowLeft size={18} /> Continue Shopping
      </Link>

      <h1 style={{ fontSize: isMobile ? "1.5rem" : "2rem" }}>Shopping Cart</h1>
      <p style={{ marginBottom: "30px" }}>
        You have {cartItems.length} items in your basket
      </p>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <ShoppingBag size={80} color="#ccc" />
          <h2>Your cart is empty</h2>
          <Link to="/products">
            <button
              type="button"
              style={{
                backgroundColor: "#2e7d32",
                color: "white",
                padding: "12px 25px",
                border: "none",
                borderRadius: "5px",
                marginTop: "20px",
                cursor: "pointer",
              }}
            >
              Shop Now
            </button>
          </Link>
        </div>
      ) : (
        <div style={styles.mainLayout}>
          <div>
            {cartItems.map((item) => (
              <div key={item.product?._id} style={styles.cartItem}>
                <img
                  src={
                    item.product?.images?.[0]?.url ||
                    "https://via.placeholder.com/100"
                  }
                  alt=""
                  style={styles.image}
                />

                <div style={{ flex: 1, width: "100%" }}>
                  <h3
                    style={{
                      margin: "0 0 5px 0",
                      paddingRight: isMobile ? "30px" : "0",
                    }}
                  >
                    {item.product?.name}
                  </h3>
                  <p style={{ margin: 0, color: "#666" }}>
                    ₦{item.product?.price?.toLocaleString()}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    width: isMobile ? "100%" : "auto",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <div style={styles.qtyControls}>
                    <button
                      type="button"
                      onClick={(e) =>
                        decreaseQty(e, item.product?._id, item.quantity)
                      }
                      style={{
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                      }}
                    >
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={(e) =>
                        increaseQty(
                          e,
                          item.product?._id,
                          item.quantity,
                          item.product?.stockQuantity,
                        )
                      }
                      style={{
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div style={styles.priceTag}>
                    ₦
                    {(
                      (item.product?.price || 0) * item.quantity
                    ).toLocaleString()}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => deleteCartItem(e, item.product?._id)}
                  style={styles.deleteBtn}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "12px",
              height: "fit-content",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
              position: isMobile ? "sticky" : "static",
              bottom: isMobile ? "20px" : "auto",
              zIndex: 100,
            }}
          >
            <h3 style={{ marginTop: 0 }}>Order Summary</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "20px 0",
              }}
            >
              <span style={{ color: "#666" }}>Total</span>
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#2e7d32",
                }}
              >
                ₦{totalPrice.toLocaleString()}
              </span>
            </div>
            <button
              type="button"
              onClick={() => navigate("/signin?redirect=shipping")}
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: "#2e7d32",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
