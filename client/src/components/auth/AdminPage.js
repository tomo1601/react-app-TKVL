import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const Admin =() =>{
    return (

        <div className='landing'>
             <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1 style={{color:'#ffffff'}}> Admin</h1>
                    <h4 style={{color:'#ffffff'}}>login to continue</h4>
                    <Form>
                        <Form.Group>
                            <Form.Label ></Form.Label>
                            <Form.Control type='text' placeholder='Username' name='username' required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label></Form.Label>
                            <Form.Control type='password' placeholder='Password' name='password' required/>
                        </Form.Group>
                        <Button className='mt-3' variant='success' type='submit'>Login</Button>
                    </Form>
                </div>
             </div>
        </div>
    )
}
export default Admin