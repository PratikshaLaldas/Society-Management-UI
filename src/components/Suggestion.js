import React ,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt, FaTrash } from "react-icons/fa"; 

const Suggestion = ({ suggestion, deleteSuggestion }) => {
  const navigate = useNavigate();

  const [showSuggestionConfirmation, setShowSuggestionConfirmation] = useState(false);
  const [suggestionToDelete, setSuggestionToDelete] = useState(null);

  const confirmDeleteSuggestion = (cid) => {
    setSuggestionToDelete(cid);
    setShowSuggestionConfirmation(true);
  };

  const cancelDelete = () => {
    setShowSuggestionConfirmation(false);
  };

  const editSuggestion = (sid) => {
    navigate(`/UpdateSuggestion/${sid}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <tr key={suggestion.sid}>
      <td>{suggestion.suggestionerName}</td>
      <td>{formatDate(suggestion.date)}</td>
      <td>{suggestion.description}</td>
      <td>
       &nbsp;&nbsp;
      <span
          className="icon-suggestion-edit-button"
          onClick={() => editSuggestion(suggestion.sid)}
        >
          <FaPencilAlt />
        </span> 
        <span
          className="icon-suggestion-delete-button"
          onClick={() => confirmDeleteSuggestion(suggestion.sid)}
        >
          <FaTrash />
        </span>

     </td>
     {showSuggestionConfirmation && (
        <div className="delete-confirmation-alert">
          <div className="delete-confirmation-content">
            <p>Are you sure you want to delete this suggestion?</p>
            <button className="alert-cancel-button" onClick={cancelDelete}>
              Cancel
            </button>
            <button className="alert-confirm-button" onClick={() => deleteSuggestion(suggestionToDelete)}>
              Yes
            </button>
          </div>
        </div>
      )}
    </tr>
  );
};

export default Suggestion;
