import React, { useState, useImperativeHandle } from "react";
import { Modal, Backdrop } from "@mui/material";

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
      <div>{props.children}</div>
    </Modal>
  );
});

export default CredentialModal;
