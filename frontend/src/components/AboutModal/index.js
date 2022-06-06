import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import About from '../About';
import './AboutModal.css'
function AboutModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="about-modal-container">
        <button className='create-post-btn' onClick={() => setShowModal(true)}>About</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <About setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default AboutModal;
