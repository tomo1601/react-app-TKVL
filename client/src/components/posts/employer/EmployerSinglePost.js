import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState } from "react";

const EmployerSinglePost = ({
  post: { id, title, description, salary, salaryType, adminAceptedEmail },
  deletePost,
  cvSubmit,
  setShowCVSubmitModal,
}) => {
  const [listCVLoading, setListCVLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  return (
    <Card className="white-space: nowrap" border="success">
      <Card.Body>
        <Card.Title>
          <Row>
            <Col className="col-12">
              <Link
                className="post-title"
                to={`/postDetail/${id}`}
                target="_blank"
              >
                {title}
              </Link>
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>
          <img
            src="https://www.pngitem.com/pimgs/m/90-907567_transparent-cash-cow-png-money-icon-png-image.png"
            width="40px"
            height="30px"
            style={{ marginRight: "10px" }}
            alt="img.png"
          />
          {salary} {salaryType !== "NONE" ? salaryType : ""}
        </Card.Text>
        <Row>
          {adminAceptedEmail ? (
            <Col>
              <Button
                disabled={listCVLoading}
                className="btn"
                variant="outline-info"
                onClick={async () => {
                  //Load data then show modal
                  setListCVLoading(true);

                  const listCV = (await cvSubmit(id)).data;
                  setShowCVSubmitModal({
                    show: true,
                    listCV: listCV === undefined ? [] : listCV,
                  });
                  setListCVLoading(false);
                }}
              >
                {listCVLoading && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                CV
              </Button>
            </Col>
          ) : (
            ""
          )}

          <Col>
            <Button className="btn" variant="outline-warning">
              Update
            </Button>
          </Col>

          <Col>
            <Button
              disabled={deleteLoading}
              className="btn"
              variant="outline-danger"
              onClick={async () => {
                setDeleteLoading(true);
                await deletePost(id);
                setDeleteLoading(false);
              }}
            >
              {deleteLoading && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Delete
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default EmployerSinglePost;
