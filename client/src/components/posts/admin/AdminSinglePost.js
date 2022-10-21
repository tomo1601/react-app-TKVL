import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useState } from "react";

const SinglePost = ({
  post: { id, title, description, salary, salaryType, adminAceptedEmail },
  adminDeletePost,
  acceptPost,
}) => {
  const [functionLoading, setFunctionLoading] = useState(false);

  return (
    <Card
      className="white-space: nowrap"
      border={adminAceptedEmail ? "success" : "warning"}
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col className="col-12">
              <Link
                className="post-title"
                to={`postDetail/${id}`}
                target="_blank"
              >
                {title}
              </Link>
            </Col>
          </Row>
        </Card.Title>
        <Card.Text className="card-text">
          {description}
        </Card.Text>
        <Card.Text className="card-text">
          <img
            src="https://www.pngitem.com/pimgs/m/90-907567_transparent-cash-cow-png-money-icon-png-image.png"
            width="40px"
            height="30px"
            style={{ marginRight: "10px" }}
          />
          {salary} {salaryType !== "NONE" ? salaryType : ""}
        </Card.Text>
        <Row>
          <Col className="col-4">
            {adminAceptedEmail ? (
              <>
                <Button
                  disabled={functionLoading}
                  className="btn"
                  variant="outline-warning"
                  onClick={async() => {
                    setFunctionLoading(true);
                    await acceptPost(id, false);
                    setFunctionLoading(false);
                  }}
                >
                  {functionLoading && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}{" "}
                  Unaccept
                </Button>
              </>
            ) : (
              <>
                <Button
                  disabled={functionLoading}
                  className="btn"
                  variant="outline-warning"
                  onClick={async() => {
                    setFunctionLoading(true);
                    await acceptPost(id, true);
                    setFunctionLoading(false);
                  }}
                >
                  {functionLoading && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}{" "}
                  Accept
                </Button>
              </>
            )}
          </Col>
          <Col>
            <Button
              className="btn"
              variant="outline-danger"
              onClick={() => {
                //adminDeletePost(id);
              }}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default SinglePost;
