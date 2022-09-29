import React from 'react'
import { PostContext } from '../contexts/PostContext'
import {useContext, useEffect} from 'react'
import Spiner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const DashBoard = () => {

  const {postState: {posts, postLoading}, getPosts} = useContext(PostContext)

  useEffect(()=> {getPosts()}, [])

  let body = null

  if(postLoading){
    body = (
      <div className='d-flex justify-content-center mt-2'>
          <Spiner animation = 'border' variant = 'info'/>
      </div>
    )
  } else if(posts.lenght ===0) {
    body =(
      <>
        <Card className='text-center mx-5 my-5'>
          <Card.Header as='h1'>Hi</Card.Header>
          <Card.Body>
            <Card.Title> Welcom</Card.Title>
            <Card.Text>
              hghjgajfgahgfgahgfghgahfgahgfjhagfjh
            </Card.Text>

          </Card.Body>

        </Card>
      </>
    )
  } 
  else {
    body =(
      <>
        <Row className ='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
          {posts.map(post => (
            <Col key={post.id} className='my-2 '>
              {/* <SinglePost post={post}/> */}
            </Col>
          ))}
        </Row>
      </>
    )
  }
 


  return (
    <>
      <div> Dashboard </div>
      {body}
    </>
    
    
  )
}

export default DashBoard