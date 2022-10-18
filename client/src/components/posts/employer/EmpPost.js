import { useContext, useEffect, useState } from "react";
import { EmployerPostContext } from "../../../contexts/EmployerPostContext";
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
import PostPaging from "../../PostPaging";
import NoPostFound from "../../NoPostFound";
import { apiUrl } from "../../../contexts/constants";
import { useQuery } from "react-query";
import axios from "axios";
import UpdatePostModal from "../../UpdatePostsModal";

const EmpPost = () => {
  const {
    postState: { posts, postLoading, currentPage, totalPage },
    getEmployerPosts,
    setShowAddPostModal,
    setShowCVSubmitModal,
    showToast: { show, message, type },
    setShowToast,
    deletePost,
    cvSubmit,
    setFieldAndCity,
    updatingPost
  } = useContext(EmployerPostContext);

  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    getEmployerPosts("page=" + 1 + "&limit=" + 9, true);
  }, []);

  const getCityAndField = async () => {
    try {
      const responseField = await axios.get(
        `${apiUrl}/field?page_number=1&limit=100`
      );
      const responseCity = await axios.get(`${apiUrl}/city`);

      return [responseField.data.data, responseCity.data.data];
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const { data: fieldAndCity, status: fcStatus } = useQuery(
    ["cityAndField"],
    async () => {
      const response = await getCityAndField()
      setFieldAndCity(response);
      return response;
    }
  );

  const handlePageChange = (pageNumber, acc) => {
    if (acc === undefined) acc = accepted;
    let key = "page=" + pageNumber + "&limit=" + 9;

    console.log(key);

    getEmployerPosts(key, acc);
  };

  let body = null;

  if (postLoading || fcStatus === "loading") {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spiner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = <NoPostFound />;
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
                setAccepted(true);
                handlePageChange(1, true);
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
                setAccepted(false);
                handlePageChange(1, false);
              }}
            />
          </MDBBtnGroup>
        </div>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3 container main-row">
          {posts.map((post) => (
            <Col key={post.id} className="my-2 ">
              <EmployerSinglePost
                post={post}
                deletePost={deletePost}
                cvSubmit={cvSubmit}
                setShowCVSubmitModal={setShowCVSubmitModal}
              />
            </Col>
          ))}
        </Row>
        <PostPaging
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPage={totalPage}
        />

        {fcStatus === "success" ? (
          <AddPostModal/>
        ) : (
          ""
        )}
        <CVSubmitModal />
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add New Job</Tooltip>}
        >
          <Button
            className="btn-floating btn"
            style={{ background: "transparent", borderColor: "none" }}
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
        {updatingPost !== null && <UpdatePostModal />}
      </>
    );
  }

  return body;
};

export default EmpPost;
