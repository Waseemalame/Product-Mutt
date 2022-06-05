import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../store/comments";

import './CreateCommentForm.css'

const CreateCommentForm = ({ post, setShowCommentForm }) => {
  const [commentContent, setCommentContent] = useState("");
  const updateCommentContent = (e) => setCommentContent(e.target.value);

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  if(!sessionUser){
    return;
  }
  const userId = sessionUser.id


  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      content: commentContent,
      userId,
      postId: post.id
    }

    let newComment = await dispatch(createComment(data))

    setShowCommentForm(false)


  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
                  type="text"
                  placeholder="Write a comment"
                  value={commentContent}
                  onChange={updateCommentContent}
                  className="create-comment-input"
                  />
        <button className="create-comment-submit">Submit</button>
        <button onClick={() => setShowCommentForm(false)} className="create-comment-cancel">Cancel</button>
      </form>
    </>

  )
}

export default CreateCommentForm
