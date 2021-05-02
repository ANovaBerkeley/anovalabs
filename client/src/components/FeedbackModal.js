import React, { useState } from 'react';
import Modal from 'react-modal';

function FeedbackModal() {
    const[showModal, setShowModal] = useState(false);

    return (
        <div>
        <button onClick={() => setShowModal(true)}>test</button>
        
        <Modal 
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
        >
        <div>   
            <h2>Title</h2>
            <p>body</p>
            <button onClick={() => setShowModal(false)}>close</button>
        </div>
        </Modal>
        </div>
    );
}

export default FeedbackModal;