import axios from "axios";
import { authConstants } from "./constants";

export const signup = (userData) => async (dispatch) => {
  dispatch({ type: authConstants.AUTH_REQUEST });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/users/signup",
      userData,
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    dispatch({ type: authConstants.AUTH_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: authConstants.AUTH_FAIL,
      payload: err.response?.data?.message || "Signup failed",
    });
  }
};

export const signin = (credentials) => async (dispatch) => {
  dispatch({ type: authConstants.AUTH_REQUEST });
  try {
    const res = await axios.post(
      "http://localhost:5000/api/users/signin",
      credentials,
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    dispatch({ type: authConstants.AUTH_SUCCESS, payload: res.data });
  } catch (err) {
    console.log("Backend Error Message:", err.response?.data?.message);

    dispatch({
      type: authConstants.AUTH_FAIL,
      payload: err.response?.data?.message || "Invalid email or password",
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch({ type: authConstants.LOGOUT });
};
