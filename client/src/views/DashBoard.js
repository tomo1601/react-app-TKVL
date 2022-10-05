import React from 'react'
import { PostContext } from '../contexts/PostContext'
import {useContext, useEffect, useState} from 'react'
import Spiner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SinglePost from '../components/posts/SinglePost'
import {AuthContext} from '../contexts/AuthContext'
import mainimage from '../assets/banner-top.png'
import iconsearch from '../assets/search-icon.png'
import Select from 'react-select';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { JOBFIELD, CITYLOCATION } from '../contexts/constants'

const DashBoard = () => {

  const {postState: {posts, postLoading}, getPosts} = useContext(PostContext)
  //const {authState:{isUser, isEmployer}} =useContext(AuthContext)
  

  

  const [searchForm, setSearchForm] = useState({
    title: "",
    location: ""
  })
  const { title, location } = searchForm
  const onChangeSearchForm = event =>
    setSearchForm({ ...searchForm, [event.target.name]: event.target.value})

    
  const [field, setField] = useState({field: ""})
  const selectedValue = e =>{
    setField(e.value);
  }

  

  useEffect(()=> {getPosts()}, [])

  let body = null

  if(postLoading){
    body = (
      <div className='d-flex justify-content-center mt-2'>
          <Spiner animation = 'border' variant = 'info'/>
      </div>
    )
  } else if(posts.lenght === 0) {
    body =(
      <>
        <Card className='text-center mx-5 my-5'>
          <Card.Header as='h1'>Hi</Card.Header>
          <Card.Body>
            <Card.Title> Welcom</Card.Title>
            <Card.Text>
              No post
            </Card.Text>

          </Card.Body>

        </Card>
      </>
    )
  } 
  else {
    body =(
      <>
        <Row className ='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3 container main-row'>
          {posts.map(post => (
            <Col key={post.id} className='my-2 '>
              <SinglePost post={post}/> 
              
            </Col>
          ))}
        </Row>
      </>
    )
  }
 


  return (
    <>
      <div className="img-main">
        <img src={mainimage} style={{ width: "100%", height: "450px", padding: "0 0 0 0 " }} alt='banner-img'/>
          <Form className="form-tim-kiem">
            <Row className="format-row">
              <Col className="col-5">
                <Form.Control 
                  type='text' 
                  placeholder='Input your key word' 
                  name='title' 
                  value ={title}
                  onChange = {onChangeSearchForm}
                  />
                
              </Col>
              <Col className="col-4">
                <Form.Control 
                    type='text' 
                    placeholder='Location' 
                    name='location' 
                    value ={location}
                    text = {field}
                    onChange = {onChangeSearchForm}
                  />
              </Col>
              <Col className="col-3">
                <Button variant="primary">
                  <img src={iconsearch} alt='img' width='26' height='26' className='mr-2'/>
                  Search
                </Button>
              </Col>
            </Row>
            <Row className="format-row">
              <Col className="col-5">
                <Select 
                  placeholder='Field' 
                  options={ JOBFIELD }
                  onChange={selectedValue}
                />
              </Col>
            </Row>
          </Form>
      </div>
      {body}
    </>
    
    
  )
}

export default DashBoard