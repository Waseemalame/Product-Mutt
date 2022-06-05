import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPostForm from '../EditPostForm';

import './EditPostModal.css'
function EditPostModal({ post }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edit-post-btn' onClick={() => setShowModal(true)}>Edit Post</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPostForm post={post} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditPostModal;
