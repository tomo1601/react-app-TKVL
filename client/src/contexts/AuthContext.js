import { createContext, useReducer } from "react"
import axios from 'axios'
import { AuthReducer } from "../reducers/AuthReducer"
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants"

export const AuthContext = createContext()

const AuthContextProvider = ({children}) =>{
    const [authState, dispatch] = useReducer(AuthReducer, {
        authloading: true,
        isAuthenticated: false,
        user: null
    })

    // Login
    const loginUser = async userForm =>{
        try {
            const response = await axios.post(`${apiUrl}/user/login`, userForm)
            if(response.data.success)
            localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.date.accessToken)

            return response.data
        }
        catch (error){
            if (error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    //conxtext data
    const authContextData = {loginUser}

    //return 
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider