import React from 'react'
import SingleResumeLine from './SingleResumeLine';
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";


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

  const [listPosts, setlistPosts] = useState({
    posts: null
  })

  console.log(currentCvId)
  useEffect(() => {
    postPredict(currentCvId);
  }, [currentCvId]);


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


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
