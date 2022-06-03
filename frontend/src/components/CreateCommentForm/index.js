import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../store/comments";

import * as sessionActions from "../../store/session";

const CreateCommentForm = ({ post, setShowCommentForm }) => {
  const [commentContent, setCommentContent] = useState("");
  const updateCommentContent = (e) => setCommentContent(e.target.value);

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  if(!sessionUser){
    return;
  }
  const userId = sessionUser.id
  // useEffect(() => {
  //   return () => {
  //     effect
  //   };
  // }, [input])

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(post.id)
    console.log('post')
    console.log('post')
    console.log('post')
    console.log('post')
    console.log('post')

    const data = {
      content: commentContent,
      userId,
      postId: post.id
    }

    let newComment = await dispatch(createComment(data))
    console.log(newComment)
    console.log('newComment from createcommform')
    console.log('newComment')
    console.log('newComment')
    console.log('newComment')
    console.log('newComment')
    console.log('newComment')
    // setShowCommentForm(false)


  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
                  type="text"
                  placeholder="Write a comment"
                  value={commentContent}
                  onChange={updateCommentContent}
                  />
        <button>Submit</button>
      </form>
    </>

  )
}

export default CreateCommentForm
