import UserLoginForm from '../components/auth/UserLoginForm'
import UserRegisterForm from '../components/auth/UserRegisterForm'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import Spiner from 'react-bootstrap/Spinner'



const AuthUser = ({authRoute}) =>{

    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)

    let body

    if (authLoading)
    body = (
        <div className='d-flex justify-content-center mt-2'>
            <Spiner animation = 'border' variant = 'info'/>
        </div>
    )
    else if(isAuthenticated ) 
        return <Redirect to ='/dashboard'/>
    else  
    body = (
        <>
                
            {authRoute==='user-login' && <UserLoginForm/>}
            {authRoute==='user-register' && <UserRegisterForm/>}
            
        </>
    )

    return (
       <div>
        {body}
       </div>
    )
}

export default AuthUser