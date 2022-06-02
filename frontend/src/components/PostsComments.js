import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getComments } from '../store/comments'

const PostsComments = ({ post, setEditItemId }) => {
  const comments = useSelector((state) => {

    if (!post.comments) return null;
    console.log(state.comments, 'state.comments!')
    console.log('whereami?????????????????????')
    console.log(post.comments, 'post.comments!')

    return post.comments.map(commentId => state.comments[commentId]);
    // console.log(Object.values(state.posts)[post.id - 1], 'heiuheihei')
    // console.log(state.posts[post.id], 'state.posts', post.id)
    // return Object.values(state.posts)[post.id - 1]
  });
  console.log(comments, 'comments from PostComments')

  // const comments = useSelector(state => console.log(state))
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments(post.id));
  }, [dispatch, post.id]);
  console.log(comments, 'comments!!!!!!!!!!!!!!!!!!!!!!!!')
  return (
    <>
      <br></br>
      { comments ? comments.map(comment => (
        <>
        <h5>Comments</h5>
        <div>{comment.User.username}</div>
        <div>{comment.content}</div>
        <br></br>
        </>
)) : ''}
    </>
  )
}

export default PostsComments
