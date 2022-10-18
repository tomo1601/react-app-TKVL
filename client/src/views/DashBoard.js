import { PostContext } from "../contexts/PostContext";
import { useContext, useEffect, useState } from "react";
import Spiner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SinglePost from "../components/posts/SinglePost";
import mainimage from "../assets/banner-top.png";
import iconsearch from "../assets/search-icon.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { apiUrl } from "../contexts/constants";
import "../components/css/Pager.css";
import PostPaging from "../components/PostPaging";
import NoPostFound from "../components/NoPostFound";
import axios from "axios";

const DashBoard = () => {
  const {
    postState: { posts, postLoading, currentPage, totalPage },
    getPosts,
  } = useContext(PostContext);
  //const {authState:{isUser, isEmployer}} =useContext(AuthContext)
  const [searchForm, setSearchForm] = useState({
    title: "",
    field: "",
    city: "",
  });

  const [changeLimit, setChangeLimit] = useState(6);

  const { title, field, city } = searchForm;

  const onChangeSearchForm = (event) =>
    setSearchForm({ ...searchForm, [event.target.name]: event.target.value });

  const [fields, setFields] = useState([]);
  const [cities, setCities] = useState([]);

  const handlePageChange = (pageNumber) => {
    let key = "page=" + pageNumber + "&limit=" + changeLimit + "&";

    if (title) key += `keyword=${title}&`;
    if (field) key += `fieldId=${field}&`;
    if (city) key += `cityId=${city}`;

    getPosts(key);
  };

  const reloadPage = (input) => {
    let key = "page=" + 1 + "&limit=" + input;

    getPosts(key);
  };

  useEffect(() => {
    const getFields = async () => {
      const response = await axios.get(
        `${apiUrl}/field?page_number=1&limit=100`
      );
      if (response.data.success) {
        setFields(response.data.data);
      }
    };
    const getCities = async () => {
      const response = await axios.get(`${apiUrl}/city`);
      if (response.data.success) {
        setCities(response.data.data);
      }
    };

    getFields();
    getCities();
    getPosts();
  }, []);

  let body = null;

  if (postLoading) {
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
        <label forhtml="limitSelect" className='page-size-label'>Change Limit Page Size:</label>
        <select
          className='page-size-select'
          id="limitSelect"
          onChange={(e) => {
            setChangeLimit(e.target.value);
            reloadPage(e.target.value);
          }}
        >
          <option value={6} defaultChecked>
            6
          </option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3 container main-row post-padding">
          {posts.map((post) => (
            <Col key={post.id} className="my-2 ">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        <PostPaging
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPage={totalPage}
        />
      </>
    );
  }

  return (
    <>
      <div className="img-main">
        <img
          src={mainimage}
          style={{ width: "100%", height: "300px", padding: "0 0 0 0 " }}
          alt="banner-img"
        />
        <Form className="form-tim-kiem">
          <Row className="format-row">
            <Col className="col-5">
              <Form.Control
                type="text"
                placeholder="Input your key word"
                name="title"
                value={title}
                onChange={onChangeSearchForm}
              />
            </Col>
            <Col className="col-4">
              <select className='select-form-search' name="city" onChange={onChangeSearchForm}>
                <option key={""} value="" defaultChecked>
                  Select City Location
                </option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col className="col-3">
              <Button
                className="btn-search-form"
                variant="primary"
                onClick={() => {
                  let key = "page=" + 1 + "&limit=" + changeLimit + "&";
                  if (title) key += `keyword=${title}&`;
                  if (field) key += `fieldId=${field}&`;
                  if (city) key += `cityId=${city}`;
                  getPosts(key);
                }}
              >
                <img
                  src={iconsearch}
                  alt="img"
                  width="26"
                  height="26"
                  className="mr-2"
                />
                Search
              </Button>
            </Col>
          </Row>
          <Row className="format-row">
            <Col className="col-5">
              <select className='select-form-search' name="field" onChange={onChangeSearchForm}>
                <option value="" defaultChecked>
                  Select Field
                </option>
                {fields.map((field) => (
                  <option key={field.id} value={field.id}>
                    {field.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
        </Form>
      </div>
      {body}
    </>
  );
};

export default DashBoard;
