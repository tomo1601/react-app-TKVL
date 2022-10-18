import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import addImage from "../assets/add-image.png";
import { useContext, useState } from "react";
import { EmployerPostContext } from "../contexts/EmployerPostContext";
import { apiUrl } from "../contexts/constants";
import { useQuery } from "react-query";
import Spinner from "react-bootstrap/esm/Spinner";
import axios from "axios";

const AddPostModal = () => {
  // Contexts

  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    useContext(EmployerPostContext);

  // State
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    salary: "",
    salaryType: "",
    location: "",
    recruit: "",
    expirationDate: "",
    fieldCode: "",
    cityCode: "",
  });

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
    async () => await getCityAndField()
  );

  const {
    title,
    description,
    salary,
    salaryType,
    location,
    recruit,
    expirationDate,
    avatar,
    fieldCode,
    cityCode
  } = newPost;

  const onChangeNewPostForm = (event) =>
    setNewPost({ ...newPost, [event.target.name]: event.target.value });

  const closeDialog = () => {
    setNewPost({
      title: "",
      description: "",
      salary: "",
      salaryType: "",
      location: "",
      recruit: "",
      expirationDate: "",
      cityCode: "",
      fieldCode: "",
      avatar: "",
    });
    setShowAddPostModal(false);
  };

  const fileToBase64 = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(null, reader.result);
    };
    reader.onerror = function (error) {
      cb(error, null);
    };
  };

  const onUploadFileChange = ({ target }) => {
    if (target.files < 1 || !target.validity.valid) {
      return;
    }
    var preview = document.getElementById("img-review");

    var reader = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
    };
    const file = target.files[0];
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }

    fileToBase64(file, (err, result) => {
      if (result) {
        setNewPost({
          ...newPost,
          avatar: file,
        });
      }
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addPost(newPost, avatar);
    setShowToast({
      show: true,
      message: message,
      type: success ? "success" : "danger",
    });
    // setNewPost({
    //   title: "",
    //   description: "",
    //   salary: "",
    //   salaryType: "",
    //   location: "",
    //   recruit: "",
    //   expirationDate: "",
    //   cityCode: "",
    //   fieldCode: "",
    // });
    // setShowAddPostModal(false);
  };
  let body;
  if (fcStatus === "success") {
    body = (
      <Modal
        className="modal-add-post"
        show={showAddPostModal}
        onHide={closeDialog}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Post</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Row>
              <Col className="col-6">
                <Form.Group className="mb-3">
                  <Form.Text id="title-help" muted>
                    Title
                  </Form.Text>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    name="title"
                    required
                    aria-describedby="title-help"
                    value={title}
                    onChange={onChangeNewPostForm}
                  />
                </Form.Group>
                <Form.Text id="title-help" muted>
                  Description
                </Form.Text>

                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={onChangeNewPostForm}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Text id="title-help" muted>
                    Salary
                  </Form.Text>
                  <Form.Control
                    type="number"
                    placeholder="Salary"
                    name="salary"
                    required
                    value={salary}
                    onChange={onChangeNewPostForm}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Text id="title-help" muted>
                    Salary Type
                  </Form.Text>
                  <Form.Control
                    type="text"
                    placeholder="Salary Type"
                    name="salaryType"
                    required
                    value={salaryType}
                    onChange={onChangeNewPostForm}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label> Field</Form.Label>
                  <Form.Select
                    name="fieldCode"
                    value={fieldCode}
                    onChange={onChangeNewPostForm}
                  >
                    {fieldAndCity[0].map((field) => (
                      <option value={field.code}>{field.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                {/* <Select
                  className="mb-3"
                  placeholder="Field"
                  options={JOBFIELD}
                  onChange={setFieldState}
                /> */}
                {/* <Select
                  className="mb-3"
                  placeholder="City"
                  options={CITYLOCATION}
                  onChange={setCityState}
                /> */}
                <Form.Group>
                  <Form.Label> City</Form.Label>
                  <Form.Select
                    name="cityCode"
                    value={cityCode}
                    onChange={onChangeNewPostForm}
                  >
                    {fieldAndCity[1].map((city) => (
                      <option value={city.code}>{city.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Text id="title-help" muted>
                    Location
                  </Form.Text>
                  <Form.Control
                    type="text"
                    placeholder="Location"
                    name="location"
                    required
                    value={location}
                    onChange={onChangeNewPostForm}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Text id="title-help" muted>
                    Recruit
                  </Form.Text>
                  <Form.Control
                    type="text"
                    placeholder="Recruit"
                    name="recruit"
                    required
                    value={recruit}
                    onChange={onChangeNewPostForm}
                  />
                </Form.Group>
                <Form.Text id="title-help" muted>
                  Expiration Date
                </Form.Text>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="Date"
                    placeholder="Expiration Date"
                    name="expirationDate"
                    required
                    aria-describedby="title-help"
                    value={expirationDate}
                    onChange={onChangeNewPostForm}
                  />
                </Form.Group>
              </Col>
              <Col className="col-6">
                <img
                  className="img-center img-add-post"
                  src={addImage}
                  id="img-review"
                />
                <input
                  className="center-block img-input-decorate"
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={onUploadFileChange}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDialog}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Confirm
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  } else {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }
  return body ;
};
export default AddPostModal;
