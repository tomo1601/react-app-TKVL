export const AuthReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, user, isUser, isEmployer, isAdmin },
  } = action;

  switch (type) {
    case "SET_AUTH":
      return {
        ...state,
        authloading: false,
        isAuthenticated,
        user,
        isUser,
        isEmployer,
        isAdmin,
      };
    default:
      return state;
  }
};
