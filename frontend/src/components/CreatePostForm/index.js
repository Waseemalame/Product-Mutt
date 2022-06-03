import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPost } from "../../store/posts";
import { ValidationError } from "../../utils/validationError";
import * as sessionActions from "../../store/session";

import "./CreatePostForm.css"


const CreatePostForm = ({ setShowModal }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState("");

  const updateTitle = (e) => setTitle(e.target.value);
  const updateContent = (e) => setContent(e.target.value);
  const updateMedia = (e) => setMedia(e.target.value);

  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);
  if(!sessionUser){
    return;
  }

  const userId = sessionUser.id

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      content,
      media,
      userId
    }

    let createdPost;
    createdPost = await dispatch(createPost(data))
    setShowModal(false)
  }

  return(
    <form className="create-post-form" onSubmit={handleSubmit}>

      <div className="create-input-div">

        <label>Title
          <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={updateTitle}
                />
        </label>
      </div>
        <div className="create-input-div">
      <label>Content
          <input
                type="text"
                placeholder="Content"
                value={content}
                onChange={updateContent}
                />
      </label>
        </div>
      <div className="create-input-div">
        <label>Media
          <input
                type="text"
                placeholder="Media"
                value={media}
                onChange={updateMedia}
                />
        </label>
      </div>
      <button className='submit-create-btn' type="submit">Create Post</button>
    </form>
  )
}


export default CreatePostForm;
