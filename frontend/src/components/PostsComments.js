import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getComments } from '../store/comments'

const PostsComments = ({ post, setEditItemId }) => {
  const comments = useSelector((state) => {

    if (!post.comments) return null;

    return post.comments.map(commentId => state.comments[commentId]);
    // console.log(Object.values(state.posts)[post.id - 1], 'heiuheihei')
    // console.log(state.posts[post.id], 'state.posts', post.id)
    // return Object.values(state.posts)[post.id - 1]
  });
  // const comments = useSelector(state => console.log(state))
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments(post.id));
  }, [dispatch, post.id]);

  return (
    <>

      <h5>Comments</h5>
      { comments ? comments.map(comment => (
        <>
        {console.log(comment, 'commentcomment')}
        <div>{comment.User.username}</div>
        <div>{comment.content}</div>

        </>
)) : ''}
    </>
  )
}

export default PostsComments
