import React from "react";
import "../DeleteConfirmationAlert.css";

const DeleteConfirmationAlert = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="delete-confirmation-alert">
      <div className="delete-confirmation-content">
        <p>{message}</p>
        <button className="alert-confirm-button" onClick={onConfirm}>
          Yes
        </button> &nbsp;
        <button className="alert-cancel-button" onClick={onCancel}>
          Cancel
        </button>
      
      </div>
    </div>
  );
};

export default DeleteConfirmationAlert;
