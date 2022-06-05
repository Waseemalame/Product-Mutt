import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePostForm from '../CreatePostForm';
import PostDetails from '../PostDetails';
import './PostDetailsModal.css'
function PostDetailsModal({ post, showModal, setShowModal }) {
  // const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='create-post-btn' onClick={() => setShowModal(true)}>Create Post</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <PostDetails post={post} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default PostDetailsModal;
