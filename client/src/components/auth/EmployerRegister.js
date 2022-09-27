import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'
import Select from 'react-select';

const EmployerRegisterForm =() =>{
    let body
    const jobfield = [
        { label: "Business Development", value: 4 },
        { label: "Aviation", value: 5 },
        { label: "Banking", value: 6 },
        { label: "Bublic Relations", value: 7 },
        { label: "Chef", value: 8 },
        { label: "Teacher", value: 9 },
        { label: "Accountant", value: 10 },
        { label: "Consultant", value: 11 },
        { label: "Digitalmedia", value: 12 },
        { label: "Apparel", value: 13 },
        { label: "Java Developer", value: 14 },
        { label: "Construction", value: 15 },
        { label: "Testing", value: 16 },
        { label: "Finance", value: 17 },
        { label: "Agriculture", value: 18 },
        { label: "Devops Engineer", value: 19 },
        { label: "Python Developer", value: 20 },
        { label: "Web Designing", value: 21 },
        { label: "HR", value: 22 },
        { label: "Hadoop", value: 23 },
        { label: "Blockchain", value: 24 },
        { label: "Mechanical Engineer", value: 25 },
        { label: "Sales", value: 26 },
        { label: "Etl Developer", value: 27 },
        { label: "Operations Manager", value: 28 },
        { label: "Data Science", value: 29 },
        { label: "Arts", value: 30 },
        { label: "Automobile", value: 31 },
        { label: "Database", value: 32 },
        { label: "Health and Fitness", value: 33 },
        { label: "PMO", value: 34 },
        { label: "Electrical Engineering", value: 35 },
        { label: "Dot Net Developer", value: 36 },
        { label: "Business Analyst", value: 37 },
        { label: "Automation Testing", value: 38 },
        { label: "Network Security Engineer", value: 39 },
        { label: "Civil Engineer", value: 40 },
        { label: "SAP Developer", value: 41 },
        { label: "BPO", value: 42 },
        { label: "Advocate", value: 43 },
        { label: "Engineering", value: 44 },   
      ];
    
    body = (
        <>
        <div className="grid login-grid main login-box">
            <div className='ute-title'>
                <h3>Sign up to continue!</h3>
                <div className='login-social'></div>
                <span className='ute-login-sml-text'>Please enter your business information</span>
            </div>
            <Form className='my-4' id='form-login'>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='' name='Name' required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type='text' placeholder='' name='Phone' required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Addess </Form.Label>
                    <Form.Control type='password' placeholder='' name='Addess' required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Field </Form.Label>
                    <Select options={ jobfield } />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
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
                <Link to='/employer/login'>
                    Login
                </Link>
            </p>
            <Link to='/user/register'>
                <Button variant='info' >Create an employee account</Button>
            </Link>
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
export default EmployerRegisterForm