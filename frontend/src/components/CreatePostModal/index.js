import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePostForm from '../CreatePostForm';
import './CreatePostModal.css'
function CreatePostModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create Post</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreatePostForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default CreatePostModal;
