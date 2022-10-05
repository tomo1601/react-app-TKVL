import React from "react";
import { useContext, useEffect, useState } from "react";
import { EmployerPostContext } from "../../../contexts/EmployerPostContext";
import SinglePost from "../SinglePost";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spiner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/esm/Button";
import addIcon from '../../../assets/plus-circle-fill.svg'
import AddPostModal from "../../AddPostsModal"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Toast from 'react-bootstrap/Toast'


const EmpPost = () => {
  const {
    postState: { posts, postLoading },
    getEmployerPosts,setShowAddPostModal,
    showToast: { show, message, type }, setShowToast
  } = useContext(EmployerPostContext);

  useEffect(() => {
    getEmployerPosts();
  }, []);
  let body = null;

  if (postLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spiner animation="border" variant="info" />
      </div>
    );
  } else if (posts.lenght === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi</Card.Header>
          <Card.Body>
            <Card.Title> Wellcome</Card.Title>
            <Card.Text>You have no post !</Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3 container main-row">
          {posts.map((post) => (
            <Col key={post.id} className="my-2 ">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        <AddPostModal />
        <OverlayTrigger placement='left'
                overlay={<Tooltip>Add category</Tooltip>}>
                <Button className="btn-floating" onClick={setShowAddPostModal.bind(this, true)}>
                    <img src={addIcon} alt="add post" width="60" height="60" />
                </Button>
            </OverlayTrigger>
            <Toast
            show={show}
            style={{ position: 'fixed', top: '20%', right: '10px' }}
            className={`bg-${type} text-white`}
            onClose={setShowToast.bind(this, {
                show: false,
                message: '',
                type: null
            })}
            delay={3000}
            autohide
        >
            <Toast.Body>
                <strong>{message}</strong>
            </Toast.Body>
        </Toast>
      </>

    );
  }

  return body;
};

export default EmpPost;
