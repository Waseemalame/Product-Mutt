import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPostForm from '../EditPostForm';

function EditPostModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditPostForm />
        </Modal>
      )}
    </>
  );
}

export default EditPostModal;
