import { productConstants } from "../Actions/constants.js";

const initialState = {
  products: [],
  loading: false,
  error: null,
  success: false,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstants.ADD_PRODUCT_REQUEST:
      return { ...state, loading: true, success: false };
    case productConstants.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        products: [...state.products, action.payload],
      };
    case productConstants.ADD_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };

    case productConstants.GET_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case productConstants.GET_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case productConstants.GET_PRODUCTS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
