import axios from "axios";
import { productConstants } from "../Actions/constants";

export const addProduct = (productData) => async (dispatch, getState) => {
  try {
    dispatch({ type: productConstants.ADD_PRODUCT_REQUEST });

    const {
      auth: { token },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const formattedData = {
      ...productData,
      price: Number(productData.price),
      stockQuantity: Number(productData.stockQuantity),
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/products/add",
      formattedData,
      config,
    );

    dispatch({
      type: productConstants.ADD_PRODUCT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: productConstants.ADD_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : "Failed to add product. Please check your inputs.",
    });
  }
};

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: productConstants.GET_PRODUCTS_REQUEST });

    const { data } = await axios.get("http://localhost:5000/api/products");

    const productsArray = data.products || data.data || data;

    dispatch({
      type: productConstants.GET_PRODUCTS_SUCCESS,
      payload: Array.isArray(productsArray) ? productsArray : [],
    });
  } catch (error) {
    dispatch({
      type: productConstants.GET_PRODUCTS_FAIL,
      payload: error.response?.data?.message || "Could not load products.",
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: productConstants.DELETE_PRODUCT_REQUEST });

    const {
      auth: { token },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(`http://localhost:5000/api/products/${id}`, config);

    dispatch({
      type: productConstants.DELETE_PRODUCT_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: productConstants.DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : "Delete failed. You may not have permission.",
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: productConstants.GET_PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);

    dispatch({
      type: productConstants.GET_PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: productConstants.GET_PRODUCT_DETAILS_FAIL,
      payload: error.response?.data?.message || "Error loading details",
    });
  }
};