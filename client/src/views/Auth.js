import UserLoginForm from '../components/auth/UserLoginForm'
import UserRegisterForm from '../components/auth/UserRegisterForm'

const Auth = ({authRoute}) =>{

    let body
    body = (
        <>
            
            {authRoute==='userlogin' && <UserLoginForm/>}
            {authRoute==='userregister' && <UserRegisterForm/>}
        
        </>
    )


    return (
       <div>
        {body}
       </div>
    )
}

export default Auth