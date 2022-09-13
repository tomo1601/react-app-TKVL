import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'

const UserRegisterForm =() =>{
    let body
    
    body = (
        <>
        <div className="grid login-grid main login-box">
            <div className='ute-title'>
                <h3>Sign up to continue!</h3>
                <div className='login-social'></div>
                <span className='ute-login-sml-text'>Please enter your email and password</span>
            </div>
            <Form className='my-4' id='form-login'>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='text' placeholder='' name='username' required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='' name='password' required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type='password' placeholder='' name='confirmPassword' required/>
                </Form.Group>
                <Button className='mt-2' variant='success' type='submit'>Register</Button>

            </Form>
            <p> Aready have an account?
                <Link to={'/user/login'}>
                    Login
                </Link>
            </p>
        </div>
        </>
    )

    return (
        <>
        {/*Header,logo*/}
        <div className="utew-login-top-header">
            <div>

            </div>
        </div>
        {/*Form login*/}
        {body}
    
        
        </>
    )
}
export default UserRegisterForm