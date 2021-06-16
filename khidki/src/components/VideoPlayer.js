import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from "react-bootstrap/Modal";

function VideoPlayer() {
    
  
    return (
      <>
      <div >
        <button onClick={showModal}>Display Modal</button>
        <Modal show={isOpen} onHide={hideModal} size="xl">         
        <iframe width="100%" height="700px" src="https://www.youtube.com/embed/F6Zy_mLgSNQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Modal>
    </div>
      </>
    );
}

export default VideoPlayer
