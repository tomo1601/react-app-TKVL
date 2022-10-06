import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const EmployerSinglePost = ({
  post: { id, title, description, salary, salaryType, adminAceptedEmail },
  deletePost,
  cvSubmit,
  setShowCVSubmitModal,
}) => (
  <Card className="white-space: nowrap" border="success">
    <Card.Body>
      <Card.Title>
        <Row>
          <Col className="col-12">
            <Link className="post-title" to={`/postDetail/${id}`} target="_blank">
              {`${title.substring(0, 30)}...`}
            </Link>
          </Col>
        </Row>
      </Card.Title>
      <Card.Text className="card-text">
        {`${description.substring(0, 60)}...`}
      </Card.Text>
      <Card.Text className="card-text">
        <img
          src="https://www.pngitem.com/pimgs/m/90-907567_transparent-cash-cow-png-money-icon-png-image.png"
          width="40px"
          height="30px"
          style={{ marginRight: "10px" }}
          alt = 'img.png'
        />
        {salary} {salaryType !== "NONE" ? salaryType : ""}
      </Card.Text>
      <Row>
        {adminAceptedEmail ? (
          <Col>
            <Button
              className="btn"
              variant="outline-info"
              onClick={async () => {
                //Load data then show modal
                const listCV = (await cvSubmit(id)).data;
                setShowCVSubmitModal({
                  show: true,
                  listCV: listCV === undefined ? [] : listCV,
                });
              }}
            >
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
            className="btn"
            variant="outline-danger"
            onClick={() => {
              deletePost(id);
            }}
          >
            Delete
          </Button>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);
export default EmployerSinglePost;
