import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const LoginForm =() =>{

    let body
    body = (
        <>
        <div className="grid login-grid main login-box">
            <div className='ute-title'>
                <h3>Sign in to continue!</h3>
                <div className='login-social'></div>
                <span className='ute-login-sml-text'>Please enter your email and password</span>
            </div>
            <Form>
                <Form.Group>
                    <Form.Control type='text' placeholder='Username' name='username' required/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type='password' placeholder='Password' name='password' required/>
                </Form.Group>
                <Button variant='success' type='submit'>Login</Button>

            </Form>
            
        </div>
        <div className='grid text-right terms mt-3'>
            {/*<p class="login__footer-text login__footer-term">Thỏa Thuận Sử Dụng</p>
            <span class="separator">|</span>
            <p class="login__footer-text">Quy Định Bảo Mật</p>
            */}
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
export default LoginForm