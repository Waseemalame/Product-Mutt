import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getComments, deleteComment } from '../../store/comments'
import CreateCommentForm from "../CreateCommentForm";

import './PostsComments.css'
const PostsComments = ({ post, setEditItemId }) => {
  const [showCommentForm, setShowCommentForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const comments = useSelector((state) => {

    if (!post.comments) return null;

    return post.comments.map(commentId => state.comments[commentId]);
    // console.log(Object.values(state.posts)[post.id - 1], 'heiuheihei')
    // console.log(state.posts[post.id], 'state.posts', post.id)
    // return Object.values(state.posts)[post.id - 1]
  });
  const userId = useSelector(state => {
    if(state.session.user){
      return state.session.user.id
    }
  })

  // const comments = useSelector(state => console.log(state))
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments(post.id));
  }, [dispatch, post.id]);


  return (
    <>
      <button onClick={() => setShowCommentForm(true)}>Reply</button>
      {showCommentForm ? (
        <CreateCommentForm post={post} setShowCommentForm={setShowCommentForm}/>
      ) : ''}
      <h5>Comments</h5>
      { comments ? comments.map(comment => (
        <>
        {comment ? (
          <>
          <div className="comment-header">
            <img className="profile-img" src={comment.User.profileImg} alt="" />
            <div>{comment.User.firstName}</div>
            <div>{comment.User.lastName}</div>
            <div>{comment.User.username}</div>
          </div>
            <div className="comment-content">{comment.content}</div>
          {userId === comment.User.id ? (
          <>
          <button onClick={() => setShowEditForm(true)} className="edit-btn">
          <img src="https://img.icons8.com/material-outlined/24/undefined/edit--v1.png" alt="edit"/>
          </button>
          <button className="delete-btn" onClick={async() => {
            console.log('WHATSUP!')
            await dispatch(deleteComment(comment.id, post.id))
          }}>
            <img src="https://img.icons8.com/material-outlined/24/undefined/trash--v1.png" alt="delete"/>
          </button>
          </>
        ) : ''}
          </>
        ) : ''}


        </>
)) : ''
}
    </>
  )
}

export default PostsComments