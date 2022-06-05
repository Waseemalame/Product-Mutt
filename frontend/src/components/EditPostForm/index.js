import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as sessionActions from "../../store/session"
import { updatePost } from '../../store/posts';
import { useHistory, useParams } from 'react-router-dom';

import { ValidationError } from '../../utils/validationError';

const EditPostForm = ({ post, setShowModal }) => {

  const dispatch = useDispatch();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [media, setMedia] = useState(post.media);

  const [validationErrors, setValidationErrors] = useState([])

  const updateTitle = (e) => setTitle(e.target.value);
  const updateContent = (e) => setContent(e.target.value);
  const updateMedia = (e) => setMedia(e.target.value);

  const [isLoaded, setIsLoaded] = useState(false);

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
      id: post.id
    }

    await dispatch(updatePost(data))

    setShowModal(false)

  }
  return(

    <div className='edit-post-container'>
      <h2>Edit Your Post</h2>
      <form
      className='edit-post-form'
      onSubmit={handleSubmit}>
        <ul className="create-form-errors">
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        <div className="edit-input-container">
          <label>Title
            <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={updateTitle}
                  />
          </label>
          <label>Content
            <input
                  type="text"
                  placeholder="Content"
                  value={content}
                  onChange={updateContent}
                  />
          </label>
          <label>Media
            <input
                  type="text"
                  placeholder="Media"
                  value={media}
                  onChange={updateMedia}
                  />
          </label>
        </div>
        <button className='finish-edit-btn' type="submit">Confirm</button>
      </form>
    </div>
  )

}

export default EditPostForm;
