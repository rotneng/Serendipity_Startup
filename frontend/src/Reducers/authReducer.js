const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  user: (() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  })(),
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };

    case "AUTH_FAIL":
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.type === "AUTH_FAIL" ? action.payload : null,
      };

    default:
      return state;
  }
};

export default authReducer;
