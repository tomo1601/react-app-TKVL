import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const EmployLoginForm =() =>{

    const {loginEmployer} = useContext(AuthContext)
  
    //local state
    const [employerLoginForm, setUserLoginForm] = useState({
        username: '',
        password: ''
    })

    const [alert, setAlert] =useState(null)

    const {username, password} = employerLoginForm
    const onChangeEmployerLoginForm = event => setUserLoginForm({
        ...employerLoginForm, [event.target.name]:event.target.value
    })

    const employerLogin = async event =>{
        event.preventDefault()
        try {
            const userLoginData = await loginEmployer(employerLoginForm)
            if(!userLoginData.success){
                setAlert({type: 'danger', message: userLoginData.message})
                setTimeout(()=> setAlert(null), 10000)
            }
        }
        catch (error){
            console.log(error)
        }
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
            <Form className='my-4' id='form-login' onSubmit={employerLogin}>
            <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='' 
                        name='username' 
                        required 
                        value ={username}
                        onChange = {onChangeEmployerLoginForm}
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
                        onChange = {onChangeEmployerLoginForm}
                    />
                </Form.Group>
                <Button className='mt-2' variant='success' type='submit'>Login</Button>

            </Form>
            <p> Don't have an account?  
                <Link to='/employer/register'>
                    Register
                </Link>
            </p>
            <Link to='/user/login'>
                <Button variant='info' >Login with Employee account</Button>
            </Link>
        </div>
        </>
    )

    return (
        <>
        {/*Header,logo*/}
        <div className="utew-login-top-header">
            <div>
                {/*picture*/}
            </div>
        </div>
        {/*Form login*/}
        {body}
        </>
    )
}
export default EmployLoginForm