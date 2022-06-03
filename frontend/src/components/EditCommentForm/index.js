import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const EditCommentForm = () => {
  const [commentContent, setCommentContent] = useState("");
  const updateCommentContent = (e) => setCommentContent(e.target.value);

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  if(!sessionUser){
    return;
  }
  const userId = sessionUser.id

  // const onSubmit = async (e) => {
  //   e.preventDefault();

  //   const data = {
  //     content: commentContent,
  //     userId,
  //     postId: post.id
  //   }

  //   let newComment = await dispatch(createComment(data))

  //   setShowCommentForm(false)


  // }

  return (
    <>
      <form>
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
export default EditCommentForm;
