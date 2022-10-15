import EmployerLoginForm from '../components/auth/EmployerLogin'
import EmployerRegisterForm from '../components/auth/EmployerRegister'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import Spiner from 'react-bootstrap/Spinner'



const AuthEmployer = ({authRoute}) =>{

    const {authState: {authLoading,isAuthenticated, isEmployer}} = useContext(AuthContext)

    let body

    if (authLoading)
    body = (
        <div className='d-flex justify-content-center mt-2'>
            <Spiner animation = 'border' variant = 'info'/>
        </div>
    )
    else if(isAuthenticated && isEmployer) 
        return <Redirect to ='/employer/posts'/>
    else  
    body = (
        <>
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

export default AuthEmployer