import { createContext, useReducer, useEffect, useState } from "react";
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

  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: null
  })
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
      } else
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

    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
    dispatch({ type: 'SET_AUTH', payload: { isAuthenticated: false, user: null, isUser: false, isEmployer: false } })
  }

  const updateUserProfile = async (profile) => {
    try {
      const response = await axios.put(`${apiUrl}/user`, profile, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      if (response.data.success) {
        dispatch({
          type: "PROFILE_LOAD_SUCCESS",
          payload: { profile: response.data }
        })
      }
      return response.data
    } catch (error) {
      console.log(error.message)
    }
  }

  const uploadUserCV = async (CV) => {
    const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME]
    try {
      const response = await axios.post(`${apiUrl}/user/cv`, CV, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${recentToken}`
        }
      })
      if (response.data.success) {
        dispatch({
          type: "CV_UPLOAD_SUCCESS",
          payload: { profile: response.data }
        })
      }
      return response.data
    } catch (error) {
      console.log(error.message)
    }
  }

  const submitUserCV = async (submitForm) => {
    try {
      console.log(submitForm.postId)
      console.log(submitForm.mediaId)
      const response = await axios.post(`${apiUrl}/user/submitcv?postId=${submitForm.postId}&mediaId=${submitForm.mediaId}`)
      if (response.data.success) {
        dispatch({
          type: "CV_SUBMIT_SUCCESS",
          payload: { submited: true }
        })
      }
      return response.data
    } catch (error) {
      console.log(error.message)
    }
  }

  //conxtext data
  const authContextData = {
    loginUser, registerUser,
    loginEmployer, logoutSection, updateUserProfile,
    showToast, setShowToast, uploadUserCV, loginAdmin,
    submitUserCV,
    authState
  }

  //return
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;



