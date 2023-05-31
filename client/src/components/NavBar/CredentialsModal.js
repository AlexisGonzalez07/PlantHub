import React, { useState, useImperativeHandle } from "react";
import { Modal, Backdrop } from "@mui/material";
import { Button } from "semantic-ui-react";

const CredentialModal = React.forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  console.log(ref)

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));
  return (
    <Modal
      open={open}
      onClose={props.handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      ref={ref}
      BackdropComponent={Backdrop}
    >
      <div style={{position: "relative", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Button style={{position: 'absolute', left: '48vw', bottom: props.login? 0 : '-10vh'}} color='red' onClick={closeModal}>
          Cancel
        </Button>{props.children}</div>
    </Modal>
  );
});

export default CredentialModal;
