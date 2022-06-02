import { useDispatch, useSelector, useStore } from "react-redux"
import { useEffect, useState } from "react";
import { getPosts } from "../../store/posts";
import { NavLink, Route, useHistory } from 'react-router-dom'

import { updatePost } from "../../store/posts";
import EditPostForm from "../EditPostForm";
import './PostList.css'
import PostDetails from "../PostDetails";
import CreatePostForm from "../CreatePostForm";
import EditPostModal from "../EditPostModal";
import { Modal } from "../../context/Modal";

const PostList = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const posts = useSelector(state => Object.values(state.posts));
  const userId = useSelector(state => {
    if(state.session.user){
      return state.session.user.id
    }
  })
  const [formOpen, setFormOpen] = useState(false)
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {

    dispatch(getPosts())

  }, [dispatch]);
  const root = document.getElementById('root')


  return (
    <>
    <div className="postlist-container">

    <CreatePostForm />
    <div className="postlist-header">Your next favorite thing 👇</div>
    {posts.map((post) => {
      return (
        <>
          {/*  */}
            <div className="post">
            <img className="post-img" src={post.media} alt="img" />
            <div className="post-details">
            {/* <p>{post.title}</p> */}

            <NavLink key={post.id} to={`/api/posts/${post.id}`} onClick={() => {setShowModal(true)}} className="post-nav">{post.title}
            <p className="post-content">{post.content}</p>
            {/* {userId === post.userId &&
            <div>
            <button>delete</button>
            </div>
            } */}

            <img className="chat-icon icon" src="https://img.icons8.com/ios-glyphs/30/undefined/chat.png" alt="chat"/>

            </NavLink>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <PostDetails />
              </Modal>
            )}
            </div>
            </div>
          {/* </NavLink> */}
          </>
      );
    })}
    {/* {formOpen ? (

      <Route path="/api/posts/:id">
              <EditPostModal />
            </Route>
    ) : null

  } */}
    {/* {formOpen ? (

      <EditPostModal />
    ) : ''

  } */}
    {/* {formOpen ? (

      root.style.backgroundColor = 'rgba(0,0,0,.6)',
      console.log('GOTTA DELETE THESE DSOSOOON')
    ) : root.style.backgroundColor = ''

  } */}
  {/* {
    formOpen ? <button className="close-btn" onClick={() => {
      history.push('/api/posts')
      setFormOpen(false)
      return
    }}>close</button> : null
  } */}
    </div>
    </>
  )
}
export default PostList
