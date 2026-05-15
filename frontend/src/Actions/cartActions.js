import axios from "axios";
import { cartConstants } from "../Actions/constants";

const getAuthHeaders = (getState) => {
  const { auth } = getState();

  const token =
    auth?.token || auth?.user?.token || localStorage.getItem("token");

  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

export const getCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: cartConstants.GET_CART_REQUEST });

    const { data } = await axios.get("/api/cart", getAuthHeaders(getState));

    dispatch({ type: cartConstants.GET_CART_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: cartConstants.GET_CART_FAIL,
      payload: error.response?.data.message || "Failed to load cart",
    });
  }
};

export const addItemsToCart =
  (productId, quantity) => async (dispatch, getState) => {
    try {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });

      const { data } = await axios.post(
        "/api/cart/add",
        { productId, quantity },
        getAuthHeaders(getState),
      );

      dispatch({ type: cartConstants.ADD_TO_CART_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({
        type: cartConstants.ADD_TO_CART_FAIL,
        payload: error.response?.data.message || "Failed to add item",
      });
    }
  };

export const updateCartQuantity =
  (productId, quantity) => async (dispatch, getState) => {
    try {
      const REQUEST_TYPE =
        cartConstants.UPDATE_CART_QUANTITY_REQUEST ||
        "UPDATE_CART_QUANTITY_REQUEST";

      dispatch({
        type: REQUEST_TYPE,
        payload: { productId, quantity },
      });

      const token = getState().auth?.token || localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/cart/update`,
        { productId, quantity },
        config,
      );

      dispatch({
        type: cartConstants.UPDATE_CART_SUCCESS,
        payload: data.cart || data.data,
      });
    } catch (error) {
      console.error("Update Cart Error:", error);
      dispatch({
        type: cartConstants.UPDATE_CART_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const removeItemsFromCart =
  (productId) => async (dispatch, getState) => {
    try {
      dispatch({ type: cartConstants.REMOVE_FROM_CART_REQUEST });

      const { data } = await axios.delete(
        `/api/cart/${productId}`,
        getAuthHeaders(getState),
      );

      dispatch({
        type: cartConstants.REMOVE_FROM_CART_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: cartConstants.REMOVE_FROM_CART_FAIL,
        payload: error.response?.data.message || "Failed to remove item",
      });
    }
  };
