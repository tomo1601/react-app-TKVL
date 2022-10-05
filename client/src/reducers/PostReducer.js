import { POSTS_LOADED_SUCCESS, POSTS_LOADED_FAIL,POST_ADDED_SUCCESS } from "../contexts/constants";

export const PostReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case POSTS_LOADED_SUCCESS:
      return {
        ...state,
        posts: payload,
        postLoading: false,
      };
    case POSTS_LOADED_FAIL:
      return {
        ...state,
        posts: [],
        postLoading: false,
      };
    case POST_ADDED_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, payload],
      };
    default:
      return state;
  }
};
