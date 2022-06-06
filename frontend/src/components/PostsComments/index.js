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

  });
  const userId = useSelector(state => {
    if(state.session.user){
      return state.session.user.id
    }
  })

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments(post.id));
  }, [dispatch, post.id]);


  return (
    <>
      <button className="chatIcon" onClick={() => setShowCommentForm(true)}>
      <img src="https://img.icons8.com/ios-glyphs/30/undefined/chat.png" alt="chat"/>
      </button>
      {showCommentForm ? (
        <CreateCommentForm post={post} setShowCommentForm={setShowCommentForm}/>
      ) : ''}
      <h5>Comments</h5>
      { comments ? comments.map(comment => (
        <>
        {comment ? (
          <>
          <div className="comment-header">
            <img className="profile-img" src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' alt="" />

            <div>{comment.User.username}</div>
          </div>
            <div className="comment-content">{comment.content}
          {userId === comment.User.id ? (
          <>

          <button className="delete-btn" onClick={async() => {
            console.log('WHATSUP!')
            await dispatch(deleteComment(comment.id, post.id))
          }}>
            <img src="https://img.icons8.com/material-outlined/24/undefined/trash--v1.png" alt="delete"/>
          </button>
          </>
        ) : ''}
        </div>
          </>
        ) : ''}

        </>
)) : ''
}
    </>
  )
}

export default PostsComments
