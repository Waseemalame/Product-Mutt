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
            {/* <Route path="/api/posts/:id"> */}
                {showModal && (
                  <Modal onClose={() => {
                    history.push('/api/posts')
                    setShowModal(false)
                    }}>
                    <PostDetails post={post}/>
                </Modal>
              )}
              {/* </Route> */}
            </>
        );
      })}
      </div>
      <div><img className="right-img" src="https://ph-files.imgix.net/d30cc037-a7fa-4213-8a31-294ea7d78924.png" alt="" /></div>
    </div>
    </>
  )
}
export default PostList
