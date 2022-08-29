import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'

const Auth = (authRoute) =>{
    return (
        <>
            Đăng nhập để tiếp tục
            {authRoute==='login'&& <LoginForm/>}
            {authRoute==='register'&&<RegisterForm/>}
        
        </>
    )
}

export default Auth