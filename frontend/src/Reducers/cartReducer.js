import { cartConstants } from "../Actions/constants";

const initialState = {
  cart: { cartItems: [] }, // Updated to match your Backend Schema name
  loading: false,
  error: null,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartConstants.GET_CART_REQUEST:
    case cartConstants.ADD_TO_CART_REQUEST:
    case cartConstants.REMOVE_FROM_CART_REQUEST:
      return { ...state, loading: true };

    case cartConstants.UPDATE_CART_QUANTITY_REQUEST:
    case "UPDATE_CART_QUANTITY_REQUEST":
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: state.cart.cartItems.map((item) =>
            (item.product?._id || item.product) === action.payload.productId
              ? { ...item, quantity: action.payload.quantity }
              : item,
          ),
        },
      };

    case cartConstants.GET_CART_SUCCESS:
    case cartConstants.ADD_TO_CART_SUCCESS:
    case cartConstants.REMOVE_FROM_CART_SUCCESS:
    case cartConstants.UPDATE_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
        error: null,
      };

    case cartConstants.GET_CART_FAIL:
    case cartConstants.ADD_TO_CART_FAIL:
    case cartConstants.REMOVE_FROM_CART_FAIL:
    case cartConstants.UPDATE_CART_FAIL:
      return { ...state, loading: false, error: action.payload };

    case cartConstants.CLEAR_CART:
      return { ...state, cart: { cartItems: [] } };

    default:
      return state;
  }
};
