import React, { useEffect } from "react";
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

  const { cart, loading } = useSelector((state) => state.cartState) || {};
  const { token } = useSelector((state) => state.auth) || {};

  const cartItems = cart?.cartItems || [];

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
    <div
      style={{
        padding: "40px 10%",
        backgroundColor: "#f9fbf9",
        minHeight: "100vh",
      }}
    >
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

      <h1>Shopping Cart</h1>
      <p>You have {cartItems.length} items in your basket</p>

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
                padding: "10px 20px",
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 350px",
            gap: "40px",
          }}
        >
          <div>
            {cartItems.map((item) => (
              <div
                key={item.product?._id}
                style={{
                  display: "flex",
                  background: "white",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "15px",
                  alignItems: "center",
                  gap: "20px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src={
                    item.product?.images?.[0]?.url ||
                    "https://via.placeholder.com/100"
                  }
                  alt=""
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />

                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 5px 0" }}>{item.product?.name}</h3>
                  <p style={{ margin: 0, color: "#666" }}>
                    ₦{item.product?.price?.toLocaleString()}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "#f0f0f0",
                    padding: "5px 10px",
                    borderRadius: "8px",
                  }}
                >
                  <button
                    type="button"
                    onClick={(e) =>
                      decreaseQty(e, item.product?._id, item.quantity)
                    }
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Minus size={14} />
                  </button>
                  <span
                    style={{
                      fontWeight: "bold",
                      minWidth: "20px",
                      textAlign: "center",
                    }}
                  >
                    {item.quantity}
                  </span>
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
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div style={{ width: "120px", textAlign: "right" }}>
                  <b style={{ color: "#2e7d32" }}>
                    ₦
                    {(
                      (item.product?.price || 0) * item.quantity
                    ).toLocaleString()}
                  </b>
                </div>

                <button
                  type="button"
                  onClick={(e) => deleteCartItem(e, item.product?._id)}
                  style={{
                    color: "#ff4d4f",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    padding: "5px",
                  }}
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
            }}
          >
            <h3 style={{ marginTop: 0 }}>Order Summary</h3>
            <hr style={{ border: "0.5px solid #eee" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "20px 0",
              }}
            >
              <span style={{ color: "#666" }}>Total Price</span>
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
                fontSize: "1rem",
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
