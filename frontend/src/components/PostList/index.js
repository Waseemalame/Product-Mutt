import { useDispatch, useSelector, useStore } from "react-redux"
import { useEffect, useState } from "react";
import { getPosts } from "../../store/posts";
import { NavLink, Route, useHistory, useParams } from 'react-router-dom'
import PostsLikes from "../PostsLikes";
import { updatePost } from "../../store/posts";
import { removePost } from "../../store/posts";
import EditPostForm from "../EditPostForm";
import './PostList.css'
import PostDetails from "../PostDetails";
import CreatePostForm from "../CreatePostForm";
import EditPostModal from "../EditPostModal";
import { Modal } from "../../context/Modal";
import CreatePostModal from "../CreatePostModal";
import PostDetailsModal from "../PostDetailsModal";

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
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {

    dispatch(getPosts())

  }, [dispatch]);
  // useEffect(() => {

  //   dispatch(removePost())

  // }, [dispatch]);
  const root = document.getElementById('root')


  return (
    <>
    <div className="main-container">
      <div className="postlist-container">
      <div className="postlist-header">Your next favorite thing 👇</div>
      {posts.map((post) => {
        return (
          <>
              <div className="post">
              <img className="post-img" src={post.media} alt="img" />
              <div className="post-details">
              <NavLink key={post.id} to={`/api/posts/${post.id}`} onClick={() => {setShowModal(true)}} className="post-nav">{post.title}
              <p className="post-content">{post.content}</p>
              <img className="chat-icon icon" src="https://img.icons8.com/ios-glyphs/30/undefined/chat.png" alt="chat"/>
              </NavLink>
              </div>
              <PostsLikes post={post} />
              </div>
            <Route path={`/api/posts/${post.id}`}>
                {/* {showModal && (
                  <Modal onClose={() => {
                    history.push('/api/posts')
                    setShowModal(false)
                    }}>
                    <PostDetails post={post}/>
                </Modal>
              )} */}
              {showModal && (
                <PostDetailsModal setShowModal={setShowModal} showModal={showModal} post={post}/>

              )
              }
              </Route>
            </>
        );
      })}
      </div>
      <div>
        <img className="right-img" src="https://ph-files.imgix.net/d30cc037-a7fa-4213-8a31-294ea7d78924.png" alt="" />
        <p className="right-img-text">Above is an image and is not a clickable link</p>
      </div>
      <div className="links">
        <a href="https://github.com/Waseemalame">
        <img src="https://img.icons8.com/material-outlined/24/undefined/github.png" alt=''/>
        </a>
        <a href="https://www.linkedin.com/in/waseemalame/">
        <img src="https://img.icons8.com/color/25/undefined/linkedin-circled--v1.png" alt=''/>
        </a>
      </div>
      <div className="libraries-icons">
      <div className="top-icon-section">
        <div className="one-icon">
          <img src="https://img.icons8.com/office/25/undefined/react.png" alt=""/>
          <p>React</p>
        </div>
        <div className="one-icon">
          <img src="https://img.icons8.com/external-flat-juicy-fish/25/undefined/external-sql-coding-and-development-flat-flat-juicy-fish.png" alt=''/>
          <p>SQL</p>
        </div>
        <div className="one-icon">
          <img src="https://img.icons8.com/color/25/undefined/redux.png" alt=""/>
          <p>Redux</p>
        </div>
        <div className="one-icon">
          <img src="https://img.icons8.com/color/25/undefined/postgreesql.png" alt=""/>
          <p>Postgres</p>
        </div>
      </div>
      <div className="bottom-icon-section">
        <div className="one-icon">
        <img src="https://img.icons8.com/color/25/undefined/html-5--v1.png" alt=""/>
          <p>HTML</p>
        </div>
        <div className="one-icon">
        <img src="https://img.icons8.com/color/25/undefined/javascript--v1.png" alt=""/>
          <p>Javascript</p>
        </div>
        <div className="one-icon">
        <img src="https://img.icons8.com/color/25/undefined/css3.png" alt=""/>
          <p>CSS</p>
        </div>
      </div>
      </div>
    </div>
    </>
  )
}
export default PostList
