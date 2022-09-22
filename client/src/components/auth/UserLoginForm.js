import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const UserLoginForm =() =>{

    const {loginUser} = useContext(AuthContext)

    const [userLoginForm, setUserLoginForm] = useState({
        username: '',
        password: ''
    })

    const {username, password} = userLoginForm
    const onChangeUserLoginForm = event => setUserLoginForm({
        ...userLoginForm, [event.target.name]:event.target.value
    })

    const userLogin = async event =>{
        event.preventDefault()
        try {
            const userLoginData = await loginUser(userLoginForm)
            console.log(userLoginData)
        }
        catch (error){
            console.log('1')
            console.log(error)
            console.log('2')
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
            <Form className='my-4' id='form-login' onSubmit={userLogin}>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type='text' 
                        placeholder='' 
                        name='username' 
                        required 
                        value ={username}
                        onChange = {onChangeUserLoginForm}
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
                        onChange = {onChangeUserLoginForm}
                    />
                </Form.Group>
                <Button className='mt-2' variant='success' type='submit'>Login</Button>
            </Form>
            <p> Don't have an account?  
                <Link to='/user/register'>
                    Register
                </Link>
            </p>
            <Link to='/employer/login'>
                <Button variant='info' >Login with Employer account</Button>
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
export default UserLoginForm