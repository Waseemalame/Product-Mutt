import { useDispatch, useSelector, useStore } from "react-redux"
import { useEffect, useState } from "react";
import { getPosts } from "../../store/posts";
import { NavLink, Route } from 'react-router-dom'
import { updatePost } from "../../store/posts";
import EditPostForm from "../EditPostForm";
import Fab from "../Fab";
import './PostList.css'
import PostDetails from "../PostDetails";

const PostList = () => {
  const [showForm, setShowForm] = useState(false);

  const dispatch = useDispatch();

  const posts = useSelector(state => Object.values(state.posts));
  const userId = useSelector(state => {
    if(state.session.user){
      return state.session.user.id
    }
  })

  useEffect(() => {

    dispatch(getPosts())

  }, [dispatch]);


  return (
    <>
    <div className="postlist-container">

    <div className="postlist-header">Your next favorite thing 👇</div>
    <Fab hidden={showForm} onClick={() => setShowForm(true)} />
    {posts.map((post) => {
      return (
        <>
          {/*  */}
            <div className="post">
            <img className="post-img" src={post.media} alt="img" />
            <div className="post-details">
            {/* <p>{post.title}</p> */}
            <NavLink key={post.id} to={`/api/posts/${post.id}`} className="post">{post.title}</NavLink>
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
            {/* <PostDetails /> */}
          <Route path="/posts/:postId">
          <PostDetails/>
          </Route>

          </>
      );
    })}
    </div>
    </>
  )
}
export default PostList
