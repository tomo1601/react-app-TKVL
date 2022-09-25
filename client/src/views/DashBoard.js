import React from 'react'
import {Link} from 'react-router-dom'
//import { AuthContext } from '../contexts/AuthContext'
//import { useContext } from 'react'


const DashBoard = () => {

  //const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)

  return (
    <div className='sc-fjqEFS cOCOrx menu-homepage '>
      <Link className='link-to-dashboard-24' to='/dashboard'>
        Predictive Resume
      </Link>
      <div className='sc-lgVVsH kiDCaC listMenu-homepage'>
        <Link className='link-to-dashboard-20' to='/'>
          Post
        </Link>
        <Link className='link-to-dashboard-20' to='/'>
          Company
        </Link>
      </div>
      <div className='sc-geuGuN cpxZcn rightNavigation-homepage'>
        <Link className='link-to-dashboard-24' to='/employer/login'>
          EMPLOYER 
        </Link>
        <div className='sc-chKnlQ iikcZg '></div>
        <div className='sc-bTmccw icRRfA  hidden-mobile div-login-homepage div-no-login'>
          <div className='wrapper-user-btn focus'>
            <div className='login-text'>
              <div className='user-text-noLogin'> Log out</div>
            </div>
          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
    
  )
}

export default DashBoard