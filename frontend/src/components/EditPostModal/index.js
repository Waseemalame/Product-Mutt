import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPostForm from '../EditPostForm';

function EditPostModal({ post }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPostForm post={post} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditPostModal;
