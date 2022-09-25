import UserLoginForm from '../components/auth/UserLoginForm'
import UserRegisterForm from '../components/auth/UserRegisterForm'
import EmployerLoginForm from '../components/auth/EmployerLogin'
import EmployerRegisterForm from '../components/auth/EmployerRegister'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import Spiner from 'react-bootstrap/Spinner'



const Auth = ({authRoute}) =>{

    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)

    let body

    if (authLoading)
    body = (
        <div className='d-flex justify-content-center mt-2'>
            <Spiner animation = 'border' variant = 'info'/>
        </div>
    )
    else if(isAuthenticated) 
        return <Redirect to ='/dashboard'/>
    else  
    body = (
        <>
                
            {authRoute==='user-login' && <UserLoginForm/>}
            {authRoute==='user-register' && <UserRegisterForm/>}
            {authRoute==='employer-login' && <EmployerLoginForm/>}
            {authRoute==='employer-register' && <EmployerRegisterForm/>}
            
        </>
    )

    return (
       <div>
        {body}
       </div>
    )
}

export default Auth