const usersReducer = (state = { dataUser: {}, token: null }, action) => {
  switch (action.type) {
    case "SIGN_UP":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        dataUser: action.payload.userExist,
        token: action.payload.token,
      }
    case "LOG_OUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        dataUser: {},
      }
    case "EDIT_PROFILE":
      return {
        ...state,
        dataUser: action.payload.userExist,
      }
    default:
      return state;
  }
};
export default usersReducer;
