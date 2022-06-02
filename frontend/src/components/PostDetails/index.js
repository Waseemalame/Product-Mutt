import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, useParams } from 'react-router-dom'
import { getPostDetails } from '../../store/posts';
import PostsComments from '../PostsComments';
import { getComments } from '../../store/posts';
import EditPostForm from '../EditPostForm';
import Fab from '../Fab';
import './PostDetails.css'
import EditPostModal from '../EditPostModal';


const PostDetails = () => {

  const postId = useParams();
  console.log(postId, 'postId') // {} ??

  const dispatch = useDispatch();
  const id = postId.id

  // const [showForm, setShowForm] = useState(false);
  const post = useSelector(state => {
    console.log(state.posts[id], 'state.posts from postDetails')
    // return Object.values(state.posts)[id - 1]
    return state.posts[id]

  })

  // const post = useSelector(state => state.post[id]);

  // console.log(post.media, 'POSTPOSTPOST')

  useEffect(() => {
    dispatch(getPostDetails(id))
  }, [dispatch, id])
  useEffect(() => {
    dispatch(getComments(id))
  }, [dispatch, id])


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
        {/* <EditPostModal /> */}
        <PostsComments post={post} />
        </div>

    </>
  )
}

export default PostDetails
