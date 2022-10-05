import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";

import { useContext, useState } from "react";
import { EmployerPostContext } from "../contexts/EmployerPostContext";
import { JOBFIELD, CITYLOCATION } from "../contexts/constants";

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
    fieldCode: '',
    cityCode: ''
  });
  const [fieldState, setFieldState] = useState("");
  const [cityState, setCityState] = useState("");

  const {
    title,
    description,
    salary,
    salaryType,
    location,
    recruit,
    expirationDate,
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
      fieldCode: ""
    });
    setShowAddPostModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    newPost.cityCode = cityState.value;
    newPost.fieldCode = fieldState.value;

    console.log(newPost);
    const { success, message } = await addPost(newPost);
    setShowToast({
      show: true,
      message: message,
      type: success ? "success" : "danger",
    });
    setNewPost({       title: "",
      description: "",
      salary: "",
      salaryType: "",
      location: "",
      recruit: "",
      expirationDate: "",
      cityCode: "",
      fieldCode: ""});
    setShowAddPostModal(false);
  };

  return (
    <Modal show={showAddPostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm mới bài viết</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Text id="title-help" muted>
              {" "}
              Title{" "}
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
            {" "}
            Description{" "}
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
              {" "}
              Salary{" "}
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
              {" "}
              Salary Type{" "}
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
          <Form.Group className="mb-3">
            <Form.Text id="title-help" muted>
              {" "}
              Location{" "}
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
              {" "}
              Recruit{" "}
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
            {" "}
            Expiration Date{" "}
          </Form.Text>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Expiration Date"
              name="expirationDate"
              required
              aria-describedby="title-help"
              value={expirationDate}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
          <Select
            className="mb-3"
            placeholder="Field"
            options={JOBFIELD}
            onChange={setFieldState}
          />
          <Select
            className="mb-3"
            placeholder="City"
            options={CITYLOCATION}
            onChange={setCityState}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            Xác nhận!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
export default AddPostModal;
