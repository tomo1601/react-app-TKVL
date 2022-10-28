import React from 'react'
import SingleResumeLine from './SingleResumeLine';
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext"
import axios from "axios";
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col"
import SinglePost from '../SinglePost';
export const UserResume = () => {

  const {
    authState: { isUser, user }, postPredict,
  } = useContext(AuthContext);

  let listCV = []

  if (isUser)
    user.profiles.map((profile) =>
      listCV.push({
        name: profile.name,
        id: profile.mediaId,
        url: profile.url
      })
    );

  const [currentCvId, setCurrentCvId] = useState(listCV[0].id)

  const callbackHandlerCv = (cvId) => {
    setCurrentCvId(cvId);
  }

  const [listPosts, setlistPosts] = useState({ posts: [] })
  const [listJobs, setlistJobs] = useState({ jobs: [] })
  const [major, setMajor] = useState({ major: '' })

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://localhost:8081/user/cvpredict?mediaId=${currentCvId}`,
      );

      setlistPosts(result.data.data);
      setlistJobs(result.data.jobOptionResponses);
      setMajor(result.data.currentView)
    };

    fetchData();
  }, []);


  console.log(listPosts)
  console.log(listJobs)
  console.log(major)


  return (
    <div className="MasterLayout_vContainer__0VU77 MasterLayout_vBackground__YBFVn">
      <div className="MasterLayout_vRow__eF7VB">
        <div
          className="MasterLayout_vCol__Raypp MasterLayout_vColLg3__rsAKf"
          style={{ display: "block" }}
        >
          <div className="vnwBox">
            <p className="title borderBottom"> Resume Managerment</p>
            <ul className="sidebarMenu">
              {listCV.map((media, index) => (
                <SingleResumeLine key={media.id} media={media} stt={index} handleClickParent={callbackHandlerCv} />
              ))}
            </ul>
          </div>
        </div>

        <div className="MasterLayout_vCol__Raypp MasterLayout_vColLg6__Repj5">
          <div className="vnwBox vnwBoxSmall">
            <span className="headerTitle">No profile has been selected yet!</span>
          </div>

          <div className="Block_Block___z99z ">
            <div className="ContactInformation_contactInformationComponent__XmtOM">
              <div> Suitable for {major}</div>
              <div>
                <ul>
                  <li>
                    <h4>{listJobs[0].name}:</h4>
                    <progress max="100" value={listJobs[0].percent.replace('%', '')}></progress>
                  </li>
                  <li>
                    <h4>{listJobs[1].name}:</h4>
                    <progress max="100" value={listJobs[1].percent.replace('%', '')}></progress>
                  </li>
                  <li>
                    <h4>{listJobs[2].name}:</h4>
                    <progress max="100" value={listJobs[2].percent.replace('%', '')}></progress>
                  </li>
                  <li>
                    <h4>{listJobs[3].name}:</h4>
                    <progress max="100" value={listJobs[3].percent.replace('%', '')}></progress>
                  </li>
                  <li>
                    <h4>{listJobs[4].name}:</h4>
                    <progress max="100" value={listJobs[4].percent.replace('%', '')}></progress>
                  </li>
                </ul>
              </div>
              <div>
                <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3 container main-row post-padding">
                  {listPosts.map((post) => (
                    <Col key={post.id} className="my-2 ">
                      <SinglePost post={post} />
                    </Col>
                  ))}
                </Row>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
