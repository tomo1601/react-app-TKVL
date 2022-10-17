import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import peopleIcon from "../../../assets/profile-icon.png";
import passIcon from "../../../assets/password-icon.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../css/EmployerProfile.css";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/esm/Spinner";
import axios from "axios";
import { apiUrl } from "../../../contexts/constants";
import { useQuery } from "react-query";
import { AuthContext } from "../../../contexts/AuthContext";
import Card from "react-bootstrap/Card";
import moneyIcon from "../../../assets/money.png";
import locationIcon from "../../../assets/location.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AlertMessage from "../../layout/AlertMessage";

const EmpProfile = () => {
  const { id } = useParams();

  //Create State
  const [showUpdate, setShowUpdate] = useState(false);

  const [showChangePassword, setShowChangePassword] = useState(false);

  const [updateLoading, setUpdateLoading] = useState(false);

  const [userInfo, setUserInfo] = useState({
    id: user.id,
    email: user.email,
    name: user ? user.name : "",
    phone: user ? user.phone : "",
    address: user ? user.address : "",
    field: user ? user.field.id : "",
    employee: user ? user.employee : "",
    cityId: user ? user.city.id : "",
    avatar: "",
  });

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [alert, setAlert] = useState(null);

  // End create State

  const {
    authState: { user, isEmployer },
    updateUserProfile,
    changePassword,
  } = useContext(AuthContext);

  //Fetch data
  const getEmpInfo = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/employer/infomation/${id}`);
      const responsePost = await axios.get(`${apiUrl}/post?authorId=${id}`);

      return [response.data, responsePost.data];
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const { data, status } = useQuery(
    ["empInfo"],
    async () => await getEmpInfo(id)
  );

  //End fetch data

  const closeDialog = () => {
    setShowUpdate(false);
  };

  let body;
  if (status === "success") {
    //Create variable from state to show on html
    const { email, name, phone, address, field, employee, cityId, avatar } =
      userInfo;

    const { oldPassword, newPassword, confirmNewPassword } = password;

    // Function
    const onChangePassword = (event) => {
      setPassword({ ...password, [event.target.name]: event.target.value });
    };

    const onCloseModalPassword = () => {
      setPassword({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setShowChangePassword(false);
    };

    const onChangeUserInfo = (event) =>
      setUserInfo({
        ...userInfo,
        [event.target.name]: event.target.value,
      });

    const onSubmitChangePassword = async (event) => {
      event.preventDefault();

      if (newPassword !== confirmNewPassword) {
        setAlert({ type: "danger", message: "Confirm password not match !" });
        setTimeout(() => setAlert(null), 10000);
      } else {
        setUpdateLoading(true);
        event.preventDefault();
        const data = {
          newPassword: newPassword,
          oldPassword: oldPassword,
        };
        try {
          const response = await changePassword("employer", data);
          console.log(response);
          setAlert({
            type: response.success ? "success" : "danger",
            message: response.message,
          });
          setTimeout(() => setAlert(null), 10000);
        } catch (error) {
          console.log(error);
        }
        setUpdateLoading(false);
      }
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
          setUserInfo({
            ...userInfo,
            avatar: file,
          });
        }
      });
    };
    
    const onSubmitUpdateProfile = async (event) => {
      setUpdateLoading(true);
      event.preventDefault();
      try {
        const profileUpdate = await updateUserProfile(
          "employer",
          userInfo,
          avatar
        );
        if (profileUpdate.success) {
          setAlert({ type: "success", message: "Update successfull" });
          setTimeout(() => setAlert(null), 10000);
        } else {
          setAlert({ type: "danger", message: profileUpdate.message });
          setTimeout(() => setAlert(null), 10000);
        }
      } catch (error) {
        console.log(error);
      }
      setUpdateLoading(false);
    };

    body = (
      <div>
        <div>
          <Modal
            className="modal-update-profile"
            show={showUpdate}
            onHide={closeDialog}
          >
            <Modal.Header closeButton>
              <Modal.Title>Update Employer Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="ContactInfoView_viewSectionWrapper__SEvGW">
                <Row>
                  <Col className="col-6">
                    <Form
                      className="native-grid"
                      onSubmit={onSubmitUpdateProfile}
                    >
                      <AlertMessage info={alert} />
                      <Form.Group>
                        <Form.Label> Email</Form.Label>
                        <Form.Control
                          type="text"
                          name="email"
                          readOnly={true}
                          value={email}
                          onChange={onChangeUserInfo}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label> Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          required
                          value={name}
                          onChange={onChangeUserInfo}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label> Phone</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          required
                          value={phone}
                          onChange={onChangeUserInfo}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label> Addess</Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          required
                          value={address}
                          onChange={onChangeUserInfo}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label> Field</Form.Label>
                        <Form.Control
                          type="number"
                          required
                          name="field"
                          value={field}
                          onChange={onChangeUserInfo}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label> Employee</Form.Label>
                        <Form.Control
                          type="number"
                          name="employee"
                          min="0"
                          required
                          value={employee}
                          onChange={onChangeUserInfo}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label> City</Form.Label>
                        <Form.Control
                          type="text"
                          name="cityId"
                          placeholder="choose a city"
                          value={cityId}
                          onChange={onChangeUserInfo}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label> Avatar</Form.Label>
                        <Form.Control
                          name="avatar"
                          type="file"
                          onChange={onUploadFileChange}
                        />
                      </Form.Group>

                      <Button
                        className="update-change-info-button"
                        variant="warning"
                        onClick={() => {
                          closeDialog();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        disabled={updateLoading}
                        className="update-change-info-button"
                        variant="success"
                        type="submit"
                      >
                        {updateLoading && (
                          <span className="spinner-border spinner-border-sm mr-1"></span>
                        )}
                        Update
                      </Button>
                    </Form>
                  </Col>
                  <Col className="col-6 img-avatar">
                    <img
                      src={user.avatar}
                      style={{ width: "80%", height: "40%" }}
                      id="img-review"
                    />
                  </Col>
                </Row>
              </div>
            </Modal.Body>
          </Modal>
        </div>
        <div>
          <Modal show={showChangePassword} onHide={onCloseModalPassword}>
            <Modal.Header closeButton>
              <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={onSubmitChangePassword}>
                <Form.Group>
                  <AlertMessage info={alert} />
                  <Form.Label> Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={onChangePassword}
                    required
                    minLength={6}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label> New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={onChangePassword}
                    required
                    minLength={6}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label> Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={onChangePassword}
                    required
                    minLength={6}
                  />
                </Form.Group>
                <Button
                  disabled={updateLoading}
                  type="submit"
                  className="update-change-info-button mt-3"
                  variant="success"
                >
                  {updateLoading && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  Confirm
                </Button>
                <Button
                  className="update-change-info-button mt-3"
                  variant="warning"
                  onClick={() => {
                    onCloseModalPassword();
                  }}
                >
                  Cancel
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
        <div className="ContactInfoView_viewSectionWrapper__SEvGW">
          <figure className="snip1336">
            <img src={data[0].avatar} alt="sample87" />
            <figcaption>
              <img
                src={data[0].avatar}
                alt="profile-sample4"
                className="profile"
              />
              <h2>
                {data[0].name}
                <span>Company Size: {data[0].employee}</span>
              </h2>
              <div
                id="c1"
                //overflow: "auto", maxHeight: "120px",
                style={{ color: "black", marginBottom: "15px" }}
              >
                {data[1].success && data[1].data.length != 0
                  ? data[1].data.map((post) => (
                      <div
                        key={post.id}
                        style={{
                          border: "1px solid #32cd32",
                          margin: "2px 2px 2px 2px",
                        }}
                      >
                        <Card>
                          <Card.Body>
                            <Card.Title>
                              <a
                                href={"/postDetail/" + post.id}
                                target="_blank"
                                style={{ color: "black", textAlign: "left" }}
                              >
                                {post.title}
                              </a>
                            </Card.Title>
                            <Card.Text>
                              <Row>
                                <Col>
                                  <img
                                    src={moneyIcon}
                                    style={{
                                      width: "15px",
                                      margin: "2px 10px 0 0",
                                    }}
                                  />
                                  {post.salary} {post.salaryType}
                                </Col>
                                <Col>
                                  <img
                                    src={locationIcon}
                                    style={{
                                      width: "15px",
                                      margin: "2px 10px 0 0",
                                    }}
                                  />
                                  Location: {post.city}{" "}
                                </Col>
                              </Row>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    ))
                  : ""}
              </div>
              {/* <p>
                I'm looking for something that can deliver a 50-pound payload of
                snow on a small feminine target. Can you suggest something?
                Hello...?
              </p> */}
              <h3>Field of Work</h3>
              <p>{data[0].field.name}</p>
              <h3>Location</h3>
              <p>{data[0].city.name + ", " + data[0].address}</p>
              <h3>Contact Infomation</h3>
              <p>
                Email : {data[0].email} <br></br>
                Phone: {data[0].phone}
              </p>

              <a href="#" className="follow">
                Follow
              </a>
            </figcaption>
          </figure>
        </div>
      </div>
    );
  } else
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );

  return (
    <div className="MasterLayout_vContainer__0VU77 MasterLayout_vBackground__YBFVn">
      <div className="MasterLayout_vRow__eF7VB">
        <div
          className="MasterLayout_vCol__Raypp MasterLayout_vColLg3__rsAKf"
          style={{ display: "block" }}
        >
          {isEmployer && user.id === id ? (
            <div className="vnwBox">
              <p className="title borderBottom"> Career Managerment</p>
              <ul className="sidebarMenu">
                <li className="sidebarMenuItem">
                  <Link
                    className="profile-link"
                    to="#"
                    onClick={() => {
                      setShowUpdate(true);
                    }}
                  >
                    <img
                      src={peopleIcon}
                      alt="img"
                      width="30"
                      height="30"
                      className="mr-2"
                    />
                    <span className="textLabel"> Update profile</span>
                  </Link>
                </li>
                <li className="sidebarMenuItem">
                  <Link
                    className="profile-link"
                    to="#"
                    onClick={() => {
                      setShowChangePassword(true);
                    }}
                  >
                    <img
                      src={passIcon}
                      alt="img"
                      width="30"
                      height="30"
                      className="mr-2"
                    />
                    <span className="textLabel">Change Password</span>
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="MasterLayout_vCol__Raypp MasterLayout_vColLg6__Repj5">
          <div className="Block_Block___z99z ">
            <div className="ContactInformation_contactInformationComponent__XmtOM">
              <svg
                className="ContactInformation_editIcon__nzify ContactInformation_showEditIcon__NCFxa"
                width={"25"}
                height={"25"}
                viewBox={"0 0 32 32"}
                xmlns={"http://www.w3.org/2000/svg"}
                xmlnsXlink={"http://www.w3.org/1999/xlink"}
              ></svg>

              <h2 className="ContactInformation_blockTitle__yHeZl">
                Thông Tin Cá Nhân
              </h2>
              {body}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpProfile;
