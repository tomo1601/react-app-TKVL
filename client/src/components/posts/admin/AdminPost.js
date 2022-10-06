import React from "react";
import { useContext, useEffect, useState } from "react";
import { EmployerPostContext } from "../../../contexts/EmployerPostContext";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spiner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";
import { MDBRadio, MDBBtnGroup } from "mdb-react-ui-kit";
import AdminSinglePost from "./AdminSinglePost";

const AdminPost = () => {
  const {
    postState: { posts, postLoading },
    getAdminPosts,
    showToast: { show, message, type },
    setShowToast,
    adminDeletePost,
    acceptPost
  } = useContext(EmployerPostContext);

  useEffect(() => {
    getAdminPosts(true);
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
        <div
          className="mt-2 container"
          style={{ justifyContent: "center", display: "flex" }}
        >
          <MDBBtnGroup>
            <MDBRadio
              btn
              btnColor="primary"
              id="btn-radio"
              name="options"
              wrapperTag="span"
              label="Accepted"
              onClick={() => {
                getAdminPosts(true);
              }}
            />
            <MDBRadio
              btn
              btnColor="secondary"
              id="btn-radio2"
              name="options"
              wrapperClass="mx-2"
              wrapperTag="span"
              label="Unaccepted"
              onClick={() => {
                getAdminPosts(false);
              }}
            />
          </MDBBtnGroup>
        </div>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3 container main-row">
          {posts.map((post) => (
            <Col key={post.id} className="my-2 ">
              <AdminSinglePost post={post} adminDeletePost={adminDeletePost} acceptPost={acceptPost}/>
            </Col>
          ))}
        </Row>
     
        <Toast
          show={show}
          style={{ position: "fixed", top: "20%", right: "10px" }}
          className={`bg-${type} text-white`}
          onClose={setShowToast.bind(this, {
            show: false,
            message: "",
            type: null,
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

export default AdminPost;
