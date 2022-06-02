import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory, useParams } from 'react-router-dom'
import { getPostDetails } from '../../store/posts';
import PostsComments from '../PostsComments';
import { getComments } from '../../store/posts';
import EditPostForm from '../EditPostForm';
import Fab from '../Fab';
import './PostDetails.css'
import EditPostModal from '../EditPostModal';
import { removePost } from '../../store/posts';


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
  const userId = useSelector(state => {
    if(state.session.user){
      return state.session.user.id
    }
  })

  // const post = useSelector(state => state.post[id]);

  // console.log(post.media, 'POSTPOSTPOST')
  const history = useHistory();
  useEffect(() => {
    dispatch(getPostDetails(id))

  }, [dispatch, id])
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
            <EditPostModal />
            <button onClick={async() => {
              await dispatch(removePost(post.id))
              history.push('/api/posts')
              return;
            }}>delete</button>
            </div>
            }

        <PostsComments post={post} />
        </div>

    </>
  )
}

export default PostDetails
