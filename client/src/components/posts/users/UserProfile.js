import { Link } from "react-router-dom";
import peopleIcon from "../../../assets/profile-icon.png";
import userSeting from "../../../assets/upload-icon.png";
import userResumeIcon from "../../../assets/resume-icon.png";
import passIcon from "../../../assets/password-icon.png";
import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../../contexts/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import AlertMessage from "../../layout/AlertMessage";
import Modal from "react-bootstrap/Modal";
import { apiUrl } from "../../../contexts/constants";
import axios from "axios";
import { useQuery } from "react-query";
import Spinner from "react-bootstrap/esm/Spinner";

const Profile = () => {
  let body;

  const [update, setUpdate] = useState(false);
  const [upload, setUpload] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const {
    authState: { user },
    updateUserProfile,
    uploadUserCV,
    changePassword,
  } = useContext(AuthContext);

  //Fetch data (field and city)
  const getCity = async () => {
    try {
      const responseCity = await axios.get(`${apiUrl}/city`);

      return responseCity.data.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const { data, status } = useQuery(["city"], async () => await getCity());

  //End fetch data

  const [userInfo, setUserInfo] = useState({
    id: user.id,
    email: user.email,
    name: user ? user.name : "",
    phone: user ? user.phone : "",
    address: user ? user.address : "",
    birth: user ? user.birth ? user.birth.split(" ")[0]: "": "",
    gender: user ? user.gender : "",
    cityId: "",
    avatar: "",
  });

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { oldPassword, newPassword, confirmNewPassword } = password;

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
        const response = await changePassword("user", data);
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
  let cvName = "There are no profiles yet";
  if (user.profiles.length !== 0) {
    cvName = user.profiles[0].name;
  }

  const [userCV, setUserCV] = useState({
    CV: "",
    name: "",
    isDefault: false,
  });

  const [alert, setAlert] = useState(null);

  if (update) {
    const { email, name, phone, address, birth, gender, cityId, avatar } =
      userInfo;

    const onChangeUserInfo = (event) =>
      setUserInfo({
        ...userInfo,
        [event.target.name]: event.target.value,
      });

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
        const profileUpdate = await updateUserProfile("user", userInfo, avatar);
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
    if (status === "success") {
      body = (
        <>
          <h2 className="ContactInformation_blockTitle__yHeZl">Infomation</h2>
          <div className="ContactInfoView_viewSectionWrapper__SEvGW">
            <Row>
              <Col className="col-6">
                <Form className="native-grid" onSubmit={onSubmitUpdateProfile}>
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
                    <Form.Label> Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="birth"
                      value={birth}
                      onChange={onChangeUserInfo}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label> Gender</Form.Label>
                    <Form.Control
                      type="text"
                      name="gender"
                      placeholder="Ex: Male/Female/Orther"
                      required
                      value={gender}
                      onChange={onChangeUserInfo}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label> City</Form.Label>
                    <Form.Select
                      name="cityId"
                      value={cityId}
                      onChange={onChangeUserInfo}
                    >
                      {data.map((city) => (
                        <option value={city.id}>{city.name}</option>
                      ))}
                    </Form.Select>
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
                      setUpdate(false);
                    }}
                  >
                    {" "}
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
                  alt="img"
                />
              </Col>
            </Row>
          </div>
        </>
      );
    } else {
      body = (
        <div className="d-flex justify-content-center mt-2">
          <Spinner animation="border" variant="info" />
        </div>
      );
    }
  } else if (upload) {
    const { CV, name, isDefault } = userCV;

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

      fileToBase64(target.files[0], (err, result) => {
        if (result) {
          setUserCV({
            ...userCV,
            CV: target.files[0],
          });
        }
      });
    };
    const onChangeUserCV = (event) =>
      setUserCV({
        ...userCV,
        [event.target.name]: event.target.value,
      });

    const onSubmitCV = async (event) => {
      event.preventDefault();
      try {
        const cvUpload = await uploadUserCV(userCV);
        console.log(cvUpload);
        if (cvUpload.data.success) {
          setAlert({ type: "success", message: "Upload successfull" });
          setTimeout(() => setAlert(null), 10000);
        } else {
          setAlert({ type: "danger", message: cvUpload.message });
          setTimeout(() => setAlert(null), 10000);
        }
      } catch (error) {
        console.log(error);
      }
    };
    body = (
      <>
        <h2 className="ContactInformation_blockTitle__yHeZl">
          Upload Your Resume
        </h2>
        <div className="ContactInfoView_viewSectionWrapper__SEvGW">
          <Form className="native-grid" onSubmit={onSubmitCV}>
            <AlertMessage info={alert} />
            <Form.Group>
              <Form.Label> Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={onChangeUserCV}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Is Default</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: true/false"
                name="isDefault"
                value={isDefault}
                onChange={onChangeUserCV}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> CV</Form.Label>
              <Form.Control
                name="CV"
                type="file"
                accept="application/pdf"
                onChange={onUploadFileChange}
              />
            </Form.Group>

            <Button
              className="update-change-info-button"
              variant="warning"
              onClick={() => {
                setUpdate(false);
              }}
            >
              {" "}
              Cancel
            </Button>
            <Button
              className="update-change-info-button"
              variant="success"
              type="submit"
            >
              {" "}
              Upload
            </Button>
          </Form>
        </div>
      </>
    );
  } else {
    body = (
      <>
        <h2 className="ContactInformation_blockTitle__yHeZl">Infomation</h2>
        <div className="ContactInfoView_viewSectionWrapper__SEvGW">
          <Row>
            <Col className="col-6">
              <Form className="native-grid">
                <Row className="row">
                  <Col className="col-12 col-lg-6">
                    <div className="undefined row">
                      <span className="undefined col-4">Email:</span>
                      <div
                        className="col-8 text-truncate fw-6"
                        style={{ width: "100%" }}
                      >
                        {user.email}
                      </div>
                    </div>
                  </Col>
                  <Col className="col-12 col-lg-6">
                    <div className="undefined row">
                      <span className="undefined col-4">Phone:</span>
                      <div
                        className="col-8 text-truncate fw-6"
                        style={{ width: "100%" }}
                      >
                        {user.phone}
                      </div>
                    </div>
                  </Col>
                  <Col className="col-12 col-lg-6">
                    <div className="undefined row">
                      <span className="undefined col-4">Name:</span>
                      <div
                        className="col-8 text-truncate fw-6"
                        style={{ width: "100%" }}
                      >
                        {user.name}
                      </div>
                    </div>
                  </Col>
                  <Col className="col-12 col-lg-6">
                    <div className="undefined row">
                      <span className="undefined col-4">Gender:</span>
                      <div
                        className="col-8 text-truncate fw-6"
                        style={{ width: "100%" }}
                      >
                        {user.gender}
                      </div>
                    </div>
                  </Col>
                  <Col className="col-12 col-lg-6">
                    <div className="undefined row">
                      <span className="undefined col-4">Birth:</span>
                      <div
                        className="col-8 text-truncate fw-6"
                        style={{ width: "100%" }}
                      >
                        {user.birth}
                      </div>
                    </div>
                  </Col>
                  <Col className="col-12 col-lg-6">
                    <div className="undefined row">
                      <span className="undefined col-4">Addess:</span>
                      <div
                        className="col-8 text-truncate fw-6"
                        style={{ width: "100%" }}
                      >
                        {user.address}
                      </div>
                    </div>
                  </Col>
                  <Col className="col-12 col-lg-6">
                    <div className="undefined row">
                      <span className="undefined col-4">City:</span>
                      <div
                        className="col-8 text-truncate fw-6"
                        style={{ width: "100%" }}
                      >
                        {user.city ? user.city.name : ""}
                      </div>
                    </div>
                  </Col>
                  <Col className="col-12 col-lg-6">
                    <div className="undefined row">
                      <span className="undefined col-4">Resume:</span>
                      <div
                        className="col-8 text-truncate fw-6"
                        style={{ width: "100%" }}
                      >
                        {cvName} .pdf
                      </div>
                    </div>
                  </Col>
                </Row>
                <Button
                  className="center-change-info-button"
                  variant="success"
                  onClick={() => {
                    setUpdate(true);
                  }}
                >
                  Update
                </Button>
              </Form>
            </Col>
            <Col className="col-6 img-avatar">
              <img src={user.avatar} style={{ width: "80%", height: "75%" }} alt='img'/>
            </Col>
          </Row>
        </div>
      </>
    );
  }

  return (
    <div className="MasterLayout_vContainer__0VU77 MasterLayout_vBackground__YBFVn">
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
      <div className="MasterLayout_vRow__eF7VB">
        <div
          className="MasterLayout_vCol__Raypp MasterLayout_vColLg3__rsAKf"
          style={{ display: "block" }}
        >
          <div className="vnwBox">
            <p className="title borderBottom"> Career Managerment</p>
            <ul className="sidebarMenu">
              <li className="sidebarMenuItem">
                <Link className="profile-link" to="/profile">
                  <img
                    src={peopleIcon}
                    alt="img"
                    width="30"
                    height="30"
                    className="mr-2"
                  />
                  <span
                    className="textLabel"
                    onClick={() => {
                      setUpload(false);
                      setUpdate(false);
                    }}
                  >
                    {" "}
                    My profile
                  </span>
                </Link>
              </li>
              <li className="sidebarMenuItem">
                <Link className="profile-link" to="/profile">
                  <img
                    src={userSeting}
                    alt="img"
                    width="30"
                    height="30"
                    className="mr-2"
                  />
                  <span
                    className="textLabel"
                    onClick={() => {
                      setUpload(true);
                      setUpdate(false);
                    }}
                  >
                    {" "}
                    Upload CV
                  </span>
                </Link>
              </li>
              <li className="sidebarMenuItem">
                <Link className="profile-link" to="/user/resume">
                  <img
                    src={userResumeIcon}
                    alt="img"
                    width="30"
                    height="30"
                    className="mr-2"
                  />
                  <span
                    className="textLabel"
                    onClick={() => {
                      setUpload(false);
                      setUpdate(false);
                    }}
                  >
                    CV Managerment{" "}
                  </span>
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
                  <span
                    className="textLabel"
                    onClick={() => {
                      setUpload(false);
                      setUpdate(false);
                    }}
                  >
                    Change Password
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="MasterLayout_vCol__Raypp MasterLayout_vColLg6__Repj5">
          <div className="vnwBox vnwBoxSmall">
            <span className="headerTitle">My Profile</span>
          </div>

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

              {body}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
