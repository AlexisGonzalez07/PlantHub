import React, { useState, useImperativeHandle, useEffect } from "react";
import { Modal } from "@mui/material";
import { Button } from "semantic-ui-react";
import FormContainer from "./FormContainer";
import Auth from "../../utils/auth";

const CredentialModal = React.forwardRef((props, ref) => {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    Auth.loggedIn() ? setOpen(false) : setOpen(true);
  }, []);


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
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={closeModal}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "white",
          padding: '2%',
          height: "auto",
          borderRadius: '1%'
        }}  
        onClick={(e) => e.stopPropagation()}
        >
        <FormContainer />
        <Button style={{ marginTop: '5%' }} color="red" onClick={closeModal}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
});

export default CredentialModal;
