import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'


const SinglePost = ({post: {id, title, description, createDate, recruit, field }}) => {
    
    <Card className='shadow' border= 'warning'>
        
        <Card.Body>
            <Card.Title>
                <Row>
                    <Col>
                        <p className='post-title'>{title}</p>
                        <Badge pill variant='warning'>
                            {title}
                        </Badge>
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