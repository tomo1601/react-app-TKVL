import EmployerLoginForm from '../components/auth/EmployerLogin'
import EmployerRegisterForm from '../components/auth/EmployerRegister'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'




const AuthEmployer = ({authRoute}) =>{

    const {authState: {isAuthenticated, isEmployer}} = useContext(AuthContext)

    let body

    if(isAuthenticated && isEmployer) 
        body = (
            <>
                {authRoute==='employer-register' && <EmployerRegisterForm/>}
                
            </>
        )
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