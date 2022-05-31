import { useDispatch, useSelector, useStore } from "react-redux"
import { useEffect, useState } from "react";
import { getPosts } from "../../store/posts";
import { NavLink, Route } from 'react-router-dom'
import { updatePost } from "../../store/posts";
import EditPostForm from "../EditPostForm";
import Popup from "../Popup";
import './PostList.css'

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => Object.values(state.posts));
  const userId = useSelector(state => state.session.user.id)

  const [buttonPopup, setButtonPopup] = useState(false)

  useEffect(() => {

    dispatch(getPosts())

  }, [dispatch]);


  return (
    <>
    <div className="postlist-container">

    <div className="postlist-header">Your next favorite thing 👇</div>
    {posts.map((post) => {
      return (
          <NavLink key={post.id} to={`/api/posts/${post.id}`} className="post">
            <img className="post-img" src={post.media} alt="img" />
            <div className="post-details">
            <p>{post.title}</p>
            <p className="post-content">{post.content}</p>
            {userId === post.userId &&
            <div>
            <button onClick={(e) => setButtonPopup(true)}>edit</button>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
              <h3>My Popup</h3>
              <p>This is my button triggered popup</p>
              <EditPostForm />
            </Popup>
            <button>delete</button>
            </div>
            }
            <button>Reply</button>
            </div>

          </NavLink>
      );
    })}
    </div>
    </>
  )
}
export default PostList
