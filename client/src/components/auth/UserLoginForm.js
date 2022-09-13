import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'


const UserLoginForm =() =>{

    let body

    body = (
        <>
        <div className="grid login-grid main login-box">
            <div className='ute-title'>
                <h3>Sign in to continue!</h3>
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
                <Button className='mt-2' variant='success' type='submit'>Login</Button>

            </Form>
            <p> Don't have an account?  
                <Link to={'/user/register'}>
                    Register
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
                {/*picture*/}
            </div>
        </div>
        {/*Form login*/}
        {body}
        </>
    )
}
export default UserLoginForm