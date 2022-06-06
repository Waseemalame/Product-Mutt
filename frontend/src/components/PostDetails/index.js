import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom'
import PostsComments from '../PostsComments';
import { getComments } from '../../store/posts';
import EditPostModal from '../EditPostModal';
import { removePost } from '../../store/posts';

import './PostDetails.css'

const PostDetails = ({ post, setShowModal }) => {

  const dispatch = useDispatch();

  const userId = useSelector(state => {
    if(state.session.user){
      return state.session.user.id
    }
  })


  const history = useHistory();

  return (
    <>
      <div className='details-container'>

          <ul className='details-list'>
            <li>
              <img className='details-image' src={post.media} alt={post.title} />
            </li>
            <li>
              <b>{post.title}</b>
            </li>
            <li>
              <p>{post.content}</p>
            </li>


          </ul>
          {userId === post.userId &&
            <div>
            <EditPostModal post={post} />
            <button
            className='delete-post-btn'
            onClick={async() => {
            // setShowModal(false)
            history.push('/')
            await dispatch(removePost(post.id))
            return;
            }}>Delete Post</button>
            </div>
            }

        <PostsComments post={post} />
        </div>

    </>
  )
}

export default PostDetails
