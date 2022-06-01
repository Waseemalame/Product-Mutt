import { useDispatch, useSelector, useStore } from "react-redux"
import { useEffect, useState } from "react";
import { getPosts } from "../../store/posts";
import { NavLink, Route, useHistory } from 'react-router-dom'

import { updatePost } from "../../store/posts";
import EditPostForm from "../EditPostForm";
import './PostList.css'
import PostDetails from "../PostDetails";

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

  useEffect(() => {

    dispatch(getPosts())

  }, [dispatch]);


  return (
    <>
    <div className="postlist-container">

    <div className="postlist-header">Your next favorite thing 👇</div>
    {posts.map((post) => {
      return (
        <>
          {/*  */}
            <div className="post">
            <img className="post-img" src={post.media} alt="img" />
            <div className="post-details">
            {/* <p>{post.title}</p> */}
            <NavLink key={post.id} to={`/api/posts/${post.id}`} onClick={() => setFormOpen(true)} className="post">{post.title} </NavLink>
            <p className="post-content">{post.content}</p>
            {userId === post.userId &&
            <div>
            <button>delete</button>
            </div>
            }
            <button>Reply</button>
            </div>
            </div>

          {/* </NavLink> */}
          </>
      );
    })}
    {formOpen ? (

      <Route path="/api/posts/:id">
              <PostDetails />
            </Route>
    ) : null

  }
  {
    formOpen ? <button className="close-btn" onClick={() => {

      return setFormOpen(false)
    }}>close</button> : history.push('/api/posts')
  }
    </div>
    </>
  )
}
export default PostList
