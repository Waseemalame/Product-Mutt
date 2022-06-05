import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getComments, deleteComment } from '../../store/comments'
import CreateCommentForm from "../CreateCommentForm";
import { getLikes, createLike, getLikeThunk } from "../../store/likes";
import { deleteLikeThunk, addLikeThunk } from "../../store/likes";

import './PostsLikes.css'
const PostsLikes = ({ post, setEditItemId }) => {
  // const [showCommentForm, setShowCommentForm] = useState(false)
  // const [showEditForm, setShowEditForm] = useState(false)
  // const [allowLike, setAllowLike] = useState(true)
  // const [count, setCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [totalLikes, setTotalLikes] = useState(0)
  const postId = post.id;
  // const userId = useSelector(state => {
  //   if(state.session.user){
  //     return state.session.user.id
  //   }
  // })
  let sessionUser = useSelector(state => state.session.user);
  let userId;
    if(sessionUser){
        userId = sessionUser.id
    }

  const likes = useSelector((state) => {

    if (!post.likes) return null;

    return post.likes.map(likeId => state.likes[likeId]);

  });


  const dispatch = useDispatch();
  useEffect(() => {
    const getLikes =  async() => {
      const likes = await dispatch(getLikeThunk(post.id))
      const thisUser = likes.find(like => like.userId === userId)
      thisUser ? setLiked(true) : setLiked(false)
      const totalLikes = likes.length
      setTotalLikes(totalLikes)
      }
      getLikes()
  }, [dispatch, post.id, setTotalLikes, userId]);

  const handleLike = async () => {
    if (liked) {
        const like = { postId, userId }
        dispatch(deleteLikeThunk(like))
        setTotalLikes(totalLikes - 1)
    } else {
        setTotalLikes(totalLikes + 1)
        const like = { postId, userId }
        dispatch(addLikeThunk(like))
    }
    setLiked(!liked)
}
  return (
    <>
      <div>
            {<button className="like-btn" onClick={sessionUser ? () => handleLike() : undefined}>
            <img src="https://img.icons8.com/external-those-icons-fill-those-icons/15/undefined/external-up-arrows-those-icons-fill-those-icons-5.png" alt="like"/>
            <p className='like-btn-number'>{totalLikes}</p>
              </button>}
        </div>
    </>
  )
}

export default PostsLikes
