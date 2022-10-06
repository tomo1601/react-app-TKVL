import React from "react";
import { useContext, useEffect, useState } from "react";
import { EmployerPostContext } from "../../../contexts/EmployerPostContext";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spiner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/esm/Button";
import addIcon from "../../../assets/plus-circle-fill.svg";
import AddPostModal from "../../AddPostsModal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Toast from "react-bootstrap/Toast";
import { MDBRadio, MDBBtnGroup } from "mdb-react-ui-kit";
import EmployerSinglePost from "./EmployerSinglePost";
import CVSubmitModal from "../../CVSubmitModal";

const EmpPost = () => {
  const {
    postState: { posts, postLoading },
    getEmployerPosts,
    setShowAddPostModal,
    setShowCVSubmitModal,
    showToast: { show, message, type },
    setShowToast,
    deletePost,
    cvSubmit
  } = useContext(EmployerPostContext);

  useEffect(() => {
    getEmployerPosts(true);
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
                getEmployerPosts(true);
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
                getEmployerPosts(false);
              }}
            />
          </MDBBtnGroup>
        </div>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3 container main-row">
          {posts.map((post) => (
            <Col key={post.id} className="my-2 ">
              <EmployerSinglePost post={post} deletePost={deletePost} cvSubmit={cvSubmit} setShowCVSubmitModal={setShowCVSubmitModal}/>
            </Col>
          ))}
        </Row>
        <AddPostModal />
        <CVSubmitModal/>
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add category</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setShowAddPostModal.bind(this, true)}
          >
            <img src={addIcon} alt="add post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
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

export default EmpPost;
