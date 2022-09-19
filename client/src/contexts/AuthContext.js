import { createContext, useReducer } from "react"
import axios from 'axios'
import { AuthReducer } from "../reducers/AuthReducer"
import { apiUrl } from "./constants"

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
            const response = await axios.post(`${apiUrl}/user/login`)
            if(response.data.success)
            localStorage.setItem()
        }
        catch (error){

        }
    }
}
