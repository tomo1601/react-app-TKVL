import UserLoginForm from '../components/auth/UserLoginForm'
import UserRegisterForm from '../components/auth/UserRegisterForm'
import EmployerLoginForm from '../components/auth/EmployerLogin'
import EmployerRegisterForm from '../components/auth/EmployerRegister'

const Auth = ({authRoute}) =>{

    let body
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