import EmployerLoginForm from '../components/auth/EmployerLogin'
import EmployerRegisterForm from '../components/auth/EmployerRegister'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { Redirect } from 'react-router-dom'



const AuthEmployer = ({authRoute}) =>{

    const {authState: {isAuthenticated, isEmployer}} = useContext(AuthContext)

    let body

    if(isAuthenticated && isEmployer) 
        return <Redirect to ='/dashboard'/>
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