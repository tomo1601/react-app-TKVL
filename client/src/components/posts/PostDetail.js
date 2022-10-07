import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { PostContext } from '../../contexts/PostContext'
import Spinner from 'react-bootstrap/esm/Spinner'
import Toast from 'react-bootstrap/Toast'
import { UserContext } from '../../contexts/UserContext'
import { AuthContext } from '../../contexts/AuthContext'

const PostDetail = () => {

  let { id } = useParams();

  const { postState: { posts, postsLoading }, findPostById } = useContext(PostContext)

  useEffect(() => { findPostById(id); }, [id])

  console.log(posts)





  let postHeader, postDetail

  postHeader = (
    <div className='wrapper-job-detail-header'>
      <section className='page-job-detail__header '>
        <div className='box box-md' >
          <div className='absolute-right premium-popover-trigger'></div>
          <div className='row'>
            <div className='col-lg-9 col-md-9 col-content'>
              <div className='job-header-info'>
                <h1 className='job-title'>
                  {posts.title}
                </h1>
                <div className='row'>
                  <div className='col-sm-12 company-name'>
                    <span className='name'> {posts.employer}</span>
                  </div>
                  <div className='col-sm-12 location-name'>
                    <span className='company-location'> Job locations:{posts.employer}</span>
                  </div>
                </div>
              </div>

            </div>
            <div className='col-lg-3 col-md-3 col-btn col-btn-save-section '>
              <div className='row'>
                <div className='col-xs-6 col-xs-push-6 col-md-12 col-md-push-0'>
                  <Button className='btn btn-primary btn-block btn-apply track-event' variant='warning'> Apply now</Button>
                </div>
                <div className='col-sm-12 location-name'>
                  <span className='company-location'> Job locations:{posts.employer}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
  
  postDetail = (
    <section className='page-job-detail__detail'>
      <div className='tab-content'>
        <div className='tab-pane tab-pane-job-info box box-md animated fadeIn active' id='job-info'>
          <div className='row'>
            <div className='col-md-4 col-sm-12 tab-sidebar'>
              <div className='mobile-box'>
                <div className='box-summary link-list'>
                  <div className='row summary-item'></div>
                  <div className='row summary-item'></div>
                  <div className='row summary-item'></div>
                  <div className='row summary-item'></div>
                  <div className='row summary-item'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
  
  return (
    <>
      <div id='wrapper' className='main-wrapper'>
        <div id='search-widget-wrapper' className='animated'>
          <div id='search-widget' className='collapse bg-blue '>
            <div className='search-form container'>
              hellooo
            </div>
            {postHeader}
            {postDetail}


          </div>
        </div>
      </div>
    </>
  )
}

export default PostDetail