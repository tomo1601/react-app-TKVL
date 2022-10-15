import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const AdminLoginForm =() =>{

    const {loginAdmin} = useContext(AuthContext)
    const [authloading, setAuthLoading] = useState(false)

    //local state
    const [adminLoginForm, setUserLoginForm] = useState({
        username: '',
        password: ''
    })

    const [alert, setAlert] =useState(null)

    const {username, password} = adminLoginForm
    const onChangeAdminLoginForm = event => setUserLoginForm({
        ...adminLoginForm, [event.target.name]:event.target.value
    })

    const adminLogin = async event =>{
        setAuthLoading(true)
        event.preventDefault()
        try {
            const userLoginData = await loginAdmin(adminLoginForm)
            if(!userLoginData.success){
                setAlert({type: 'danger', message: userLoginData.message})
                setTimeout(()=> setAlert(null), 10000)
            }
        }
        catch (error){
            console.log(error)
        }
        setAuthLoading(false)
    }

    let body
    
    body = (
        <>
        <div className="grid login-grid main login-box">
            <div className='ute-title'>
                <h3>Sign in to continue!</h3>
                <div className='login-social'></div>
                <span className='ute-login-sml-text'>Please enter your email and password</span>
            </div>
            <Form className='my-4' id='form-login' onSubmit={adminLogin}>
            <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='' 
                        name='username' 
                        required 
                        value ={username}
                        onChange = {onChangeAdminLoginForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder='' 
                        name='password' 
                        required 
                        value ={password}
                        onChange = {onChangeAdminLoginForm}
                    />
                </Form.Group>
                <Button disabled={authloading} 
                variant='success' type='submit' className="mt-2">
                        {authloading && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Login
                    </Button>
                {/* <Button className='mt-2' variant='success' type='submit'>Login</Button> */}

            </Form>
        </div>
        </>
    )

    return (
        <>
        {/*Header,logo*/}
        <div className="utew-login-top-header">
            <div className='logo-box-login'>
                <Link className='link-to-dashboard-36' to='/dashboard'>Admin</Link>
            </div>
        </div>
        {/*Form login*/}
        {body}
        </>
    )
}
export default AdminLoginForm