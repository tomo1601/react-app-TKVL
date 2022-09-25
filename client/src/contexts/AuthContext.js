import { createContext, useReducer, useEffect } from "react"
import axios from 'axios'
import { AuthReducer } from "../reducers/AuthReducer"
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants"
import SetAuthToken from "../utlis/SetAuthToken"

export const AuthContext = createContext()

const AuthContextProvider = ({children}) =>{
    const [authState, dispatch] = useReducer(AuthReducer, {
        authloading: true,
        isAuthenticated: false,
        user: null
    })

    // auth user
    const loadUser = async ()=>{
        
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            SetAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]) 
        }
        try {
            const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME]
            const response = await axios.get(`${apiUrl}/user`,{
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${recentToken}`
                }}) 
            if(response.data.message !== 'You need authenticate first to access this api'){
                dispatch({type: 'SET_AUTH', payload:{isAuthenticated: true, user: response.data}})
            }
        } 
        catch(error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            SetAuthToken(null)
            dispatch({type: 'SET_AUTH', payload:{isAuthenticated: false, user: null}})
        }
    }

    useEffect(()=> {loadUser()},[])

    // Login
    const loginUser = async userForm =>{
        try {
            const response = await axios.post(`${apiUrl}/user/login`, userForm)
            if(response.data.success)
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token)

            await loadUser()
            return response.data
        }
        catch (error){
            if (error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    // Register user
    const registerUser = async userForm =>{
        try {
            console.log(userForm)
            const response = await axios.post(`${apiUrl}/user/singup`, userForm)
            console.log(1)
            if(response.data.success)
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token)

            return response.data
        }
        catch (error){
            if (error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    //conxtext data
    const authContextData = {loginUser, registerUser, authState}

    //return 
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider