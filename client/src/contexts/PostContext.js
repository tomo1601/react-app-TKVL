import axios from "axios";
import { createContext, useReducer } from "react";
import {PostReducer} from '../reducers/PostReducer'
import { apiUrl } from "./constants";


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
            const response = await axios.get(`${apiUrl}/post`)
            if(response.success){
                dispatch({type:'POSTS_LOADED_SUCCESS', payload: response.data})
            }
            
        } catch (error) {
            if (error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    // postcontextdata
    const postContextData = {postState, getPosts}
    
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider