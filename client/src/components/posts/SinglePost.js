import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'


const SinglePost = ({post: {id, title, description, createDate, recruit, expirationDate, employer, city, field, salary, salaryType }}) => {
    
    <Card className='shadow' border= 'warning'>
        
        <Card.Body>
            <Card.Title>
                <Row>
                    <Col>
                        <p className='post-title'>{title}</p>
                        <Badge pill variant='warning'>
                            hello
                        </Badge>
                    </Col>
                    <Col className='text-right'>
                        <Button>Hollll</Button>
                    </Col>

                </Row>
            </Card.Title>
            <Card.Text>
                {description}
            </Card.Text>
        </Card.Body>

    </Card>


}

export default SinglePost