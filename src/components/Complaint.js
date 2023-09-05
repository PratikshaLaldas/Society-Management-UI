import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt, FaTrash } from "react-icons/fa"; 

const Complaint = ({ complaint, deleteComplaint }) => {
  const navigate = useNavigate();

  const editComplaint = (cid) => {
    navigate(`/UpdateComplaint/${cid}`);
  };

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [complaintToDelete, setComplaintToDelete] = useState(null);

  const confirmDeleteComplaint = (cid) => {
    setComplaintToDelete(cid);
    setShowDeleteConfirmation(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    
    <tr >
      <td>{complaint.complainerName}</td>
      <td>{formatDate(complaint.date)}</td>
      <td>{complaint.description}</td>
      <td>{complaint.solutionMsg}</td>
      <td>
        &nbsp; &nbsp;
      <span
          className="icon-complaint-edit-button"
          onClick={() => editComplaint(complaint.cid)}
        >
          <FaPencilAlt />
        </span> 
        <span
          className="icon-complaint-delete-button"
          onClick={() => confirmDeleteComplaint(complaint.cid)}
        >
          <FaTrash />
        </span>
      </td>
      {showDeleteConfirmation && (
        <div className="delete-confirmation-alert">
          <div className="delete-confirmation-content">
            <p>Are you sure you want to delete this complaint?</p>
            <button className="alert-cancel-button" onClick={cancelDelete}>
              Cancel
            </button>
            <button className="alert-confirm-button" onClick={() => deleteComplaint(complaintToDelete)}>
              Yes
            </button>
          </div>
        </div>
      )}
    </tr>
  );
};

export default Complaint;
