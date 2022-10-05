import axios from "axios";
import { createContext, useReducer,useState } from "react";
import { PostReducer } from "../reducers/PostReducer";
import {
  apiUrl,
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  LOCAL_STORAGE_TOKEN_NAME,
  POST_ADDED_SUCCESS
} from "./constants";

export const EmployerPostContext = createContext();

const EmployerPostContextProvider = ({ children }) => {
  // state
  const [postState, dispatch] = useReducer(PostReducer, {
    posts: [],
    postLoading: true,
  });

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // get employer post
  const getEmployerPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/employer/post?expirationDate=2001-01-01&page=1&limit=12`);
      if (response.data.success) {
        dispatch({ type: POSTS_LOADED_SUCCESS, payload: response.data.data });
      }
    } catch (error) {
      dispatch({ type: POSTS_LOADED_FAIL });
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
  // postcontextdata
  const employerPostContextData = {
    postState,
    getEmployerPosts,
    showAddPostModal,
    setShowAddPostModal,
    showUpdatePostModal,
    setShowUpdatePostModal,
    showToast,
    setShowToast,
    addPost,
  };

  return (
    <EmployerPostContext.Provider value={employerPostContextData}>
      {children}
    </EmployerPostContext.Provider>
  );
};

export default EmployerPostContextProvider;
