import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, useParams } from 'react-router-dom'
import { getPostDetails } from '../../store/posts';
import EditPostForm from '../EditPostForm';
import Fab from '../Fab';
import './PostDetails.css'



const PostDetails = () => {

  const postId = useParams();
  const dispatch = useDispatch();
  const id = postId.id

  // const [showForm, setShowForm] = useState(false);
  const post = useSelector(state => Object.values(state.posts)[id - 1])
  // console.log(post, 'POSTPOSTPOST')
  useEffect(() => {
    dispatch(getPostDetails(id))
  }, [dispatch, id])

  return (
    <>
      <div className='details-container'>
      <button>Close</button>

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
        <EditPostForm />
        </div>

    </>
  )
}

export default PostDetails
