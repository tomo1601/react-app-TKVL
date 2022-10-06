import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { AuthReducer } from "../reducers/AuthReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME, USER_ROLE } from "./constants";
import SetAuthToken from "../utlis/SetAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(AuthReducer, {
    authloading: true,
    isAuthenticated: false,
    user: null,
    isUser: false,
    isEmployer: false,
    isAdmin: false,
  });

  // auth user
  const loadUser = async (user) => {
    if (user === undefined) user = localStorage[USER_ROLE];
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      SetAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }
    try {
      const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
      if (recentToken !== undefined) {
        const response = await axios.get(`${apiUrl}/${user}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${recentToken}`,
          },
        });
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data,
            isUser: user === "user" ? true : false,
            isEmployer: user === "employer" ? true : false,
            isAdmin: user === "admin" ? true : false,
          },
        });
      }else
       throw new Error("Unauthorized !");
    } catch (error) {
      console.log(error);
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      localStorage.removeItem(USER_ROLE);
      SetAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: false,
          user: null,
          isUser: false,
          isEmployer: false,
          isAdmin: false,
        },
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loginAdmin = async (adminForm) => {
    try {
      const response = await axios.post(`${apiUrl}/admin/login`, adminForm);
      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token);
        localStorage.setItem(USER_ROLE, "admin");
        await loadUser("admin");
      }
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  // Login user
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/user/login`, userForm);
      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token);
        localStorage.setItem(USER_ROLE, "user");
        await loadUser("user");
      }

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Register user
  const registerUser = async (userForm) => {
    try {
      console.log(userForm);
      const response = await axios.post(`${apiUrl}/user/singup`, userForm);
      if (response.data.success)
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token);
      localStorage.setItem(USER_ROLE, "user");
      return response.data;
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else return { success: false, message: error.message };
    }
  };

  // Login employer
  const loginEmployer = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/employer/login`, userForm);
      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token);
        localStorage.setItem(USER_ROLE, "employer");
        await loadUser("employer");
      }
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const logoutSection = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    localStorage.removeItem(USER_ROLE);

    dispatch({
      type: "SET_AUTH",
      payload: {
        isAuthenticated: false,
        user: null,
        isUser: false,
        isEmployer: false,
      },
    });
  };
  //conxtext data
  const authContextData = {
    loginAdmin,
    loginUser,
    registerUser,
    loginEmployer,
    logoutSection,
    authState,
  };

  //return
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
