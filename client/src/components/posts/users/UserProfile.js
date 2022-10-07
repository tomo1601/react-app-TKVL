import React from 'react'
import { Link } from 'react-router-dom'
import peopleIcon from '../../../assets/profile-icon.png'
import userSeting from '../../../assets/upload-icon.png'
import userResumeIcon from '../../../assets/resume-icon.png'
import passIcon from '../../../assets/password-icon.png'
import { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form'
import { AuthContext } from '../../../contexts/AuthContext'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import AlertMessage from '../../layout/AlertMessage'


const Profile = () => {

  let body

  const [update, setUpdate] = useState(false)
  const [upload, setUpload] = useState(false)
  const { authState: { user }, updateUserProfile, uploadUserCV } = useContext(AuthContext)

  const [userInfo, setUserInfo] = useState({
    id: user.id,
    email: user.email,
    name: user ? user.name : '',
    phone: user ? user.phone : '',
    address: user ? user.address : '',
    birth: user ? user.birth : '',
    gender: user ? user.gender : '',
    cityId: '',
    avata:''
  })

  const [userCV, setUserCV] = useState({
    CV: '',
    name: '',
    isDefault: false
  })

  const [alert, setAlert] = useState(null)


  if (update) {
    const { email, name, phone, address, birth, gender, cityId, avata } = userInfo

    const onChangeUserInfo = event => setUserInfo({
      ...userInfo, [event.target.name]: event.target.value
    })

    const fileToBase64 = (file, cb) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        cb(null, reader.result)
      }
      reader.onerror = function (error) {
        cb(error, null)
      }
    }
    const onUploadFileChange = ({ target }) => {
      if (target.files < 1 || !target.validity.valid) {
        return
      }

      fileToBase64(target.files[0], (err, result) => {
        if (result) {

          setUserInfo({
            ...userInfo, avata: target.files[0]
          })
        }
      })
    }
    const onSubmitUpdateProfile = async event => {
      event.preventDefault()
      try {
        const profileUpdate = await updateUserProfile(userInfo, avata)
        console.log(profileUpdate)
        if (profileUpdate.data.success) {
          setAlert({ type: 'success', message: 'Update successfull' })
          setTimeout(() => setAlert(null), 10000)
        }
        else {
          setAlert({ type: 'danger', message: profileUpdate.message })
          setTimeout(() => setAlert(null), 10000)
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    body = (
      <>
        <h2 class="ContactInformation_blockTitle__yHeZl">Infomation</h2>
        <div className='ContactInfoView_viewSectionWrapper__SEvGW'>
          <Form className='native-grid' onSubmit={onSubmitUpdateProfile}>
            <AlertMessage info={alert} />
            <Form.Group>
              <Form.Label> Email</Form.Label>
              <Form.Control
                type='text'
                name='email'
                readOnly='true'
                value={email}
                onChange={onChangeUserInfo}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                required
                value={name}
                onChange={onChangeUserInfo}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Phone</Form.Label>
              <Form.Control
                type='text'
                name='phone'
                required
                value={phone}
                onChange={onChangeUserInfo}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Addess</Form.Label>
              <Form.Control
                type='text'
                name='address'
                required
                value={address}
                onChange={onChangeUserInfo}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Birth</Form.Label>
              <Form.Control
                type='date'
                name='birth'
                value={birth}
                onChange={onChangeUserInfo}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Gender</Form.Label>
              <Form.Control
                type='text'
                name='gender'
                placeholder='Ex: Male/Female/Orther'
                required
                value={gender}
                onChange={onChangeUserInfo}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> City</Form.Label>
              <Form.Control
                type='text'
                name='cityId'
                placeholder='chose a city'
                value={cityId}
                onChange={onChangeUserInfo}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Avata</Form.Label>
              <Form.Control
                name='avata'
                type="file"
                onChange={onUploadFileChange}
              />
            </Form.Group>

            <Button className='update-change-info-button' variant='warning'
              onClick={() => {
                setUpdate(false)
              }}> Cancel</Button>
            <Button className='update-change-info-button' variant='success' type='submit'> Update</Button>
          </Form>
        </div>
      </>

    )
  }
  else if (upload) {

    const { CV, name, isDefault } = userCV

    const fileToBase64 = (file, cb) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        cb(null, reader.result)
      }
      reader.onerror = function (error) {
        cb(error, null)
      }
    }
    const onUploadFileChange = ({ target }) => {
      if (target.files < 1 || !target.validity.valid) {
        return
      }

      fileToBase64(target.files[0], (err, result) => {
        if (result) {

          setUserCV({
            ...userCV, CV: target.files[0]
          })
        }
      })
    }
    const onChangeUserCV = event => setUserCV({
      ...userCV, [event.target.name]: event.target.value
    })

    const onSubmitCV = async event => {
      event.preventDefault()
      try {
        const cvUpload = await uploadUserCV(userCV)
        console.log(cvUpload)
        if (cvUpload.data.success) {
          setAlert({ type: 'success', message: 'Upload successfull' })
          setTimeout(() => setAlert(null), 10000)
        }
        else {
          setAlert({ type: 'danger', message: cvUpload.message })
          setTimeout(() => setAlert(null), 10000)
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    body = (
      <>
        <h2 class="ContactInformation_blockTitle__yHeZl">Upload Your Resume</h2>
        <div className='ContactInfoView_viewSectionWrapper__SEvGW'>
          <Form className='native-grid' onSubmit={onSubmitCV}>
            <AlertMessage info={alert} />
            <Form.Group>
              <Form.Label> Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                value={name}
                onChange={onChangeUserCV}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Is Default</Form.Label>
              <Form.Control
                type='text'
                placeholder='Ex: true/false'
                name='isDefault'
                value={isDefault}
                onChange={onChangeUserCV}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> CV</Form.Label>
              <Form.Control
                name='CV'
                type="file"
                accept='application/pdf'
                onChange={onUploadFileChange}
              />
            </Form.Group>

            <Button className='update-change-info-button' variant='warning'
              onClick={() => {
                setUpdate(false)
              }}> Cancel</Button>
            <Button className='update-change-info-button' variant='success' type='submit'> Upload</Button>
          </Form>
        </div>
      </>

    )
  }
  else {
    body = (
      <>
        <h2 class="ContactInformation_blockTitle__yHeZl">Infomation</h2>
        <div className='ContactInfoView_viewSectionWrapper__SEvGW'>
          <Form className='native-grid'>
            <Row className='row'>
              <Col className='col-12 col-lg-6'>
                <div className='undefined row'>
                  <span className='undefined col-4'>Email:</span>
                  <div className='col-8 text-truncate fw-6'>{user.email}</div>
                </div>
              </Col>
              <Col className='col-12 col-lg-6'>
                <div className='undefined row'>
                  <span className='undefined col-4'>Phone:</span>
                  <div className='col-8 text-truncate fw-6'>{user.phone}</div>
                </div>
              </Col>
              <Col className='col-12 col-lg-6'>
                <div className='undefined row'>
                  <span className='undefined col-4' >Name:</span>
                  <div className='col-8 text-truncate fw-6' >{user.name}</div>
                </div>
              </Col>
              <Col className='col-12 col-lg-6'>
                <div className='undefined row'>
                  <span className='undefined col-4'>Gender:</span>
                  <div className='col-8 text-truncate fw-6'>{user.gender}</div>
                </div>
              </Col>
              <Col className='col-12 col-lg-6'>
                <div className='undefined row'>
                  <span className='undefined col-4'>Birth:</span>
                  <div className='col-8 text-truncate fw-6'>{user.birth}</div>
                </div>
              </Col>
              <Col className='col-12 col-lg-6'>
                <div className='undefined row'>
                  <span className='undefined col-4'>Addess:</span>
                  <div className='col-8 text-truncate fw-6'>{user.address}</div>
                </div>
              </Col>
              <Col className='col-12 col-lg-6'>
                <div className='undefined row'>
                  <span className='undefined col-4'>City:</span>
                  <div className='col-8 text-truncate fw-6'>{user.city}</div>
                </div>
              </Col>
              <Col className='col-12 col-lg-6'>
                <div className='undefined row'>
                  <span className='undefined col-4'>Resume:</span>
                  <div className='col-8 text-truncate fw-6'>
                    {
                      user.profiles[0].name
                    }

                  </div>
                </div>
              </Col>

            </Row>
            <Button className='center-change-info-button' variant='success'
              onClick={() => {
                setUpdate(true)
              }}> Update</Button>
          </Form>
        </div>
      </>

    )
  }





  return (
    <div className='MasterLayout_vContainer__0VU77 MasterLayout_vBackground__YBFVn'>
      <div className='MasterLayout_vRow__eF7VB'>
        <div className='MasterLayout_vCol__Raypp MasterLayout_vColLg3__rsAKf' style={{ display: 'block' }}>
          <div className='vnwBox'>
            <p className='title borderBottom'> Career Managerment</p>
            <ul className='sidebarMenu'>
              <li className='sidebarMenuItem'>
                <Link classname='profile-link' to='/profile'>
                  <img src={peopleIcon} alt='img' width='30' height='30' className='mr-2' />
                  <span className='textLabel' onClick={() => { setUpload(false); setUpdate(false); }}> My profile</span>
                </Link>
              </li>
              <li className='sidebarMenuItem'>
                <Link classname='profile-link' to='/profile'>
                  <img src={userSeting} alt='img' width='30' height='30' className='mr-2' />
                  <span className='textLabel' onClick={() => { setUpload(true); setUpdate(false); }}> Upload CV</span>
                </Link>
              </li>
              <li className='sidebarMenuItem'>
                <Link classname='profile-link' to='/profile'>
                  <img src={userResumeIcon} alt='img' width='30' height='30' className='mr-2' />
                  <span className='textLabel' onClick={() => { setUpload(false); setUpdate(false); }}>Account seting</span>
                </Link>
              </li>
              <li className='sidebarMenuItem'>
                <Link classname='profile-link' to='/profile'>
                  <img src={passIcon} alt='img' width='30' height='30' className='mr-2' />
                  <span className='textLabel' onClick={() => { setUpload(false); setUpdate(false); }}>Change Password</span>
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
              <svg className='ContactInformation_editIcon__nzify ContactInformation_showEditIcon__NCFxa' width={'25'} height={'25'}
                viewBox={'0 0 32 32'} xmlns={'http://www.w3.org/2000/svg'} xmlnsXlink={'http://www.w3.org/1999/xlink'} >

              </svg>


              {body}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Profile


