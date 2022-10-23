import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from "react";
import userResumeIcon from "../../../assets/resume-icon.png";
import Button from 'react-bootstrap/esm/Button';


const SingleResumeLine = ({ media: { id, url, name }, stt, handleClickParent }) => {


  const [showChoseHiden, setshowChoseHiden] = useState(false);

  const showHideChose = (value) => {
    setshowChoseHiden(value)
  }


  const setViewPost = () => {
    handleClickParent(id)
  };



  return (
    <li className="sidebarMenuItem" onMouseOver={() => showHideChose(true)} onMouseOut={() => showHideChose(false)}>
      <a className="profile-link" href={url} target='blank'>
        <img
          src={userResumeIcon}
          alt="img"
          width="30"
          height="30"
          className="mr-2"
        />
        <span className="textLabel">
          {stt + 1}. {name}.pdf
        </span>
      </a>
      <div style={{ display: `${showChoseHiden ? 'block' : 'none'}` }} id='options-for-among-cv' >
        <div className='chose-cv'>
          <a href={url} target='blank'>
            <Button variant='success'> View this CV </Button>
          </a>
          <Button className= 'btn-view-job' variant='success' onClick={setViewPost}>
            View Job
          </Button>
        </div>
      </div>
    </li>
  )
}

export default SingleResumeLine