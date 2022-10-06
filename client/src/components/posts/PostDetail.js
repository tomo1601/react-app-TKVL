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
  
  let postHeader, postDetail

  postHeader = (
    <div className='wrapper-job-detail-header'>
        
      
    </div>
  )

  return (
    <> 
      <div id='wrapper' className='main-wrapper'>
        <div is='search-widget-wrapper' className='animated'>
          <div id='search-widget' className='collapse bg-blue '>
            <div className='search-form container'>
                hellooo
            </div>
            <div className='wrapper-job-detail-header'>
              <section className='page-job-detail__header '>
                <div className='box box-md' style={{pading: ' 0 0 20px 0;'}}>
                  <div className='absolute-right premium-popover-trigger'></div>

                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostDetail