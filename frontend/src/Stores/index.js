import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk";
import authReducer from "../Reducers/authReducer";
import { cartReducer } from "../Reducers/cartReducer";
import { productReducer } from "../Reducers/productReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  cartState: cartReducer,
  productReducer: productReducer,
});

const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  auth: {
    token: tokenFromStorage,
    user: userFromStorage,
    isAuthenticated: !!tokenFromStorage,
    loading: false,
    error: null,
  },
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
