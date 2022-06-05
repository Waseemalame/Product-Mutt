import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory, useParams } from 'react-router-dom'
import { getPostDetails } from '../../store/posts';
import PostsComments from '../PostsComments';
import { getComments } from '../../store/posts';
import EditPostForm from '../EditPostForm';
import Fab from '../Fab';
import EditPostModal from '../EditPostModal';
import { removePost } from '../../store/posts';

import './PostDetails.css'

const PostDetails = ({ post, setShowModal }) => {

  const param = useParams();
  // console.log(param.id, 'postId') // {} ??

  const dispatch = useDispatch();
  // const id = postId.id

  // const [showForm, setShowForm] = useState(false);
  // const onePost = useSelector(state => {
    // console.log(state.posts[id], 'state.posts from postDetails')
    // return Object.values(state.posts)[id - 1]


    // return state.posts[post.id]

  // })
  const userId = useSelector(state => {
    if(state.session.user){
      return state.session.user.id
    }
  })

  // const post = useSelector(state => state.posts[param.id]);


  const history = useHistory();

  // useEffect(() => {
  //   dispatch(getPostDetails(post.id))

  // }, [dispatch, post.id])
  // useEffect(() => {
  //   dispatch(removePost(id))
  // }, [dispatch, id])



  return (
    <>
      <div className='details-container'>
      {/* <button>Close</button> */}

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
        {/* <Comments /> */}

          </ul>
          {/* {userId === post.userId &&
            <div>
            <button>delete</button>
            </div>
            } */}
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
