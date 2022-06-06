import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePostForm from '../CreatePostForm';
import './CreatePostModal.css'
function CreatePostModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="create-form-modal-container">
        <button className='create-post-btn' onClick={() => setShowModal(true)}>Create Post</button>
        {showModal && (
          <Modal className="create-post-modal-container" onClose={() => setShowModal(false)}>
            <CreatePostForm setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default CreatePostModal;
