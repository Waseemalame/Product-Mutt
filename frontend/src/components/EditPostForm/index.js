import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from '../Popup';

import * as sessionActions from "../../store/session"
import { updatePost } from '../../store/posts';
const EditPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState("");

  const updateTitle = (e) => setTitle(e.target.value);
  const updateContent = (e) => setContent(e.target.value);
  const updateMedia = (e) => setMedia(e.target.value);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);
  if(!sessionUser){
    return;
  }
  const userId = sessionUser.id


  const handleSubmit = async (e) => {
    e.stopPropogation();
    console.log('anything')
    console.log('anything')
    console.log('anything')
    console.log('anything')
    e.preventDefault();

    const data = {
      title,
      content,
      media,
      // userId
    }

    const updatedPost = await dispatch(updatePost(data))
    console.log(updatedPost)
    console.log('anything')
    console.log('anything')
    console.log('anything')
    console.log('anything')
    console.log('anything')

  }
  return(

    <form onSubmit={handleSubmit}>
      <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={updateTitle}
            />
      <input
            type="text"
            placeholder="Content"
            value={content}
            onChange={updateContent}
            />
      <input
            type="text"
            placeholder="Media"
            value={media}
            onChange={updateMedia}
            />
      <button type="submit">Finish Edit</button>
    </form>
  )

}

export default EditPostForm;
