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
  const [validationErrors, setValidationErrors] = useState([])


  const updateTitle = (e) => setTitle(e.target.value);
  const updateContent = (e) => setContent(e.target.value);
  const updateMedia = (e) => setMedia(e.target.value);

  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    let postName;
    const errors = [];

  if(!title || title.length < 3) errors.push("Title must be 3 or more characters");
  if(title.length > 20) errors.push('Name must be 20 characters or less');
  if(!content) errors.push("Content field cannot be empty");
  if(!media) errors.push("Media field cannot be empty")
  setValidationErrors(errors);


  }, [title, content, media]);

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

        <h2 className="create-post-header">Create Post</h2>
        <ul className="create-form-errors">
          {validationErrors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      <div className="create-input-container">
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
    </div>
      <button className='submit-create-btn' type="submit" disabled={validationErrors.length > 0}>Create Post</button>
    </form>
  )
}


export default CreatePostForm;
