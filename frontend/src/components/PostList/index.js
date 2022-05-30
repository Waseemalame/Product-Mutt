import { useDispatch, useSelector, useStore } from "react-redux"
import { useEffect } from "react";
import { getPosts } from "../../store/posts";
import './PostList.css'

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => Object.values(state.posts));
  const userId = useSelector(state => state.session.user.id)
  console.log(userId, 'userId !!!')
  useEffect(() => {

    dispatch(getPosts())

  }, [dispatch]);


  return (
    <>
    <div className="postlist-container">

    <div className="postlist-header">Your next favorite thing 👇</div>
    {posts.map((post) => {
      return (
        <ul>
          <li key={post.id} className="post">
            <img className="post-img" src={post.media} alt="img" />
            <div className="post-details">
            <p>{post.title}</p>
            <p className="post-content">{post.content}</p>
            {userId === post.userId &&
            <div>
            <button>edit</button>
            <button>delete</button>
            </div>
            }
            <button>Reply</button>
            </div>

          </li>
        </ul>
      );
    })}
    </div>
    </>
  )
}
export default PostList
