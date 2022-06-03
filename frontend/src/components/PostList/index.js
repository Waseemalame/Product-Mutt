import { useDispatch, useSelector, useStore } from "react-redux"
import { useEffect, useState } from "react";
import { getPosts } from "../../store/posts";
import { NavLink, Route, useHistory, useParams } from 'react-router-dom'

import { updatePost } from "../../store/posts";
import { removePost } from "../../store/posts";
import EditPostForm from "../EditPostForm";
import './PostList.css'
import PostDetails from "../PostDetails";
import CreatePostForm from "../CreatePostForm";
import EditPostModal from "../EditPostModal";
import { Modal } from "../../context/Modal";

const PostList = () => {
  const id = useParams();

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
  // useEffect(() => {

  //   dispatch(removePost())

  // }, [dispatch]);
  const root = document.getElementById('root')


  return (
    <>
    <div className="postlist-container">

    <CreatePostForm />
    <div className="postlist-header">Your next favorite thing 👇</div>
    {posts.map((post) => {
      return (
        <>
            <div className="post">
            <img className="post-img" src={post.media} alt="img" />
            <div className="post-details">

            <NavLink key={post.id} to={`/api/posts/${post.id}`} onClick={() => {setShowModal(true)}} className="post-nav">{post.title}

            <p className="post-content">{post.content}</p>
            {/* {userId === post.userId &&
            <div>
            <button>delete</button>
            </div>
            } */}

            <img className="chat-icon icon" src="https://img.icons8.com/ios-glyphs/30/undefined/chat.png" alt="chat"/>

            </NavLink>

            </div>
            </div>
          <Route path="/api/posts/:id">
              {showModal && (
                <Modal onClose={() => {
                  history.push('/api/posts')
                  setShowModal(false)
                  }}>
                  <PostDetails />
              </Modal>
            )}
            </Route>
          </>
      );
    })}
    </div>
    </>
  )
}
export default PostList
