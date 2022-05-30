import { useSelector, useStore } from "react-redux"
import './PostList.css'

const PostList = () => {
  const posts = useSelector(state => state.posts.list);


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
