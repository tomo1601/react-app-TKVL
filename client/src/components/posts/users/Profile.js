import React from 'react'
import {Link} from 'react-router-dom'
import peopleIcon from '../../../assets/profile-icon.png'
import userSeting from '../../../assets/user-seting.png'
import userResumeIcon from '../../../assets/resume-icon.png'
import passIcon from '../../../assets/password-icon.png'

const Profile = () => {

  let body


  return (
    <div className='MasterLayout_vContainer__0VU77 MasterLayout_vBackground__YBFVn'>
      <div className='MasterLayout_vRow__eF7VB'>
        <div className='MasterLayout_vCol__Raypp MasterLayout_vColLg3__rsAKf' style={{display: 'block'}}>
          <div className='vnwBox'>
            <p className='title borderBottom'> Career Managerment</p>
            <ul className='sidebarMenu'>
              <li className='sidebarMenuItem'>
                <Link classname = 'profile-link' to='/profile'>
                  <img src={peopleIcon} alt='img' width='30' height='30' className='mr-2'/>
                  <span className='textLabel'> My profile</span>
                </Link>
              </li>
              <li className='sidebarMenuItem'>
                <Link classname = 'profile-link' to='/'>
                  <img src={userSeting} alt='img' width='30' height='30' className='mr-2'/>
                  <span className='textLabel'> Profile seting</span>
                </Link>
              </li>
              <li className='sidebarMenuItem'>
                <Link classname = 'profile-link' to='/'>
                  <img src={userResumeIcon} alt='img' width='30' height='30' className='mr-2'/>
                  <span className='textLabel'>Account seting</span>
                </Link>
              </li>
              <li className='sidebarMenuItem'>
                <Link classname = 'profile-link' to='/'>
                  <img src={passIcon} alt='img' width='30' height='30' className='mr-2'/>
                  <span className='textLabel'>Change Password</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='MasterLayout_vCol__Raypp MasterLayout_vColLg6__Repj5'>
          <div className='vnwBox vnwBoxSmall'>
            <span class="headerTitle">My Profile</span>
          </div>

          <div className='Block_Block___z99z '>
            <div className='ContactInformation_contactInformationComponent__XmtOM' >
              <svg></svg>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  )
}

export default Profile