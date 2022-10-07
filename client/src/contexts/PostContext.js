import axios from "axios";
import { createContext, useReducer } from "react";
import {PostReducer} from '../reducers/PostReducer'
import { apiUrl, POSTS_LOADED_FAIL, POSTS_LOADED_SUCCESS } from "./constants";


export const PostContext = createContext()

const PostContextProvider = ({children}) => {

    // state
    const [postState, dispatch] = useReducer(PostReducer,{
        posts: [],
        postLoading: true
    })

    // get api post
    const getPosts = async()=>{
        try {
            const response = await axios.get(`${apiUrl}/post?&page=1&limit=40`)
            if(response.data.success){
                dispatch({type: POSTS_LOADED_SUCCESS, payload: response.data.data})
            }
            
        } catch (error) {
            dispatch({type: POSTS_LOADED_FAIL })
        }
    }

    const findPostById = async postId => {
        try {
            const response = await axios.get(`${apiUrl}/post/${postId}`)
            if (response.data.success) {
                dispatch({ type: "POSTS_FIND_SUCCESS", payload: response.data.data })
            }
            return response.data.post
        } catch (error) {
            console.log(error)
            return error
        }

    }

    

    // postcontextdata
    const postContextData = {postState, getPosts, findPostById}
    
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider