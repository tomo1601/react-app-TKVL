import axios from "axios";
import { createContext, useReducer, useState } from "react";
import { PostReducer } from "../reducers/PostReducer";
import {
  apiUrl,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  LOCAL_STORAGE_TOKEN_NAME,
  POST_ADDED_SUCCESS,
  POST_DELETED_SUCCESS,
  POST_ACCEPTED_SUCCESS,
} from "./constants";

export const EmployerPostContext = createContext();

const EmployerPostContextProvider = ({ children }) => {
  // state
  const [postState, dispatch] = useReducer(PostReducer, {
    posts: [],
    postLoading: true,
  });

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showCVSubmitModal, setShowCVSubmitModal] = useState({
    show: false,
    listCV: [],
  });
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // get employer post
  const getEmployerPosts = async (value) => {
    try {
      const response = await axios.get(
        `${apiUrl}/employer/post?expirationDate=2001-01-01&page=1&limit=100&accepted=${value}`
      );

      if (response.data.success) {
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.data });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  // get admin post
  const getAdminPosts = async (value) => {
    try {
      const response = await axios.get(
        `${apiUrl}/admin/post?expirationDate=2001-01-01&page=1&limit=100&accepted=${value}`
      );
      if (response.data.success) {
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.data });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
    }
  };

  const acceptPost = async (id, accept) => {
    try {
      const response = await axios.put(
        `${apiUrl}/admin/post/${accept ? "accept" : "unaccept"}/${id}`
      );
      if (response.data.success) {
        setShowToast({
          show: true,
          message: response.data.message,
          type: response.data.success ? "success" : "danger",
        });
        dispatch({ type: POST_ACCEPTED_SUCCESS, payload: id });
      }
      return true;
    } catch (error) {
      setShowToast(true, "Server error", "danger");
      return false;
    }
  };

  const adminDeletePost = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/admin/post?postId=${id}`);
      if (response.data.success) {
        dispatch({ type: POST_DELETED_SUCCESS, payload: id });
        setShowToast({
          show: true,
          message: response.data.message,
          type: response.data.success ? "success" : "danger",
        });
        return true;
      }
    } catch (error) {
      setShowToast(true, "Server error", "danger");
      return false;
    }
  };
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(
        `${apiUrl}/employer/post/tool`,
        newPost
      );
      if (response.data.success) {
        dispatch({ type: POST_ADDED_SUCCESS, payload: response.data.data });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await axios.delete(
        `${apiUrl}/employer/post?postId=${id}`
      );
      if (response.data.success) {
        dispatch({ type: POST_DELETED_SUCCESS, payload: id });
        setShowToast({
          show: true,
          message: response.data.message,
          type: response.data.success ? "success" : "danger",
        });
        return true;
      }
    } catch (error) {
      setShowToast(true, "Server error", "danger");
      return false;
    }
  };

  const cvSubmit = async (id) => {
    try {
      const response = await axios.get(
        `${apiUrl}/employer/submitcv?postId=${id}`
      );
      if (response.data.success) {
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };
  // postcontextdata
  const employerPostContextData = {
    postState,
    getEmployerPosts,
    showAddPostModal,
    setShowAddPostModal,
    showUpdatePostModal,
    setShowUpdatePostModal,
    showCVSubmitModal,
    setShowCVSubmitModal,
    showToast,
    setShowToast,
    addPost,
    deletePost,
    cvSubmit,
    getAdminPosts,
    acceptPost,
    adminDeletePost,
  };

  return (
    <EmployerPostContext.Provider value={employerPostContextData}>
      {children}
    </EmployerPostContext.Provider>
  );
};

export default EmployerPostContextProvider;
