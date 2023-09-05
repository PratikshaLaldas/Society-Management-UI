import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResidentService from "../services/ResidentService";
import Suggestion from "./Suggestion";
import FooterComponent from "./FooterComponent";
import ResidentNavbar from "./ResidentNavbar";
import { toast, ToastContainer } from "react-toastify";
import "../SuggestionList.css";

const SuggestionList = () => {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("key");

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const urlWithPrivateKey = `http://localhost:8083/residents/view_all_suggestions/?key=${loggedIn}`;
    
    ResidentService.getAllSuggestions(urlWithPrivateKey)
      .then((response) => {
        console.log("Fetched suggestions:", response.data);
        setSuggestions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching suggestions:", error);
      });
  }, []);

  const deleteSuggestion = (sid) => {
    const urlWithPrivateKey = `http://localhost:8083/residents/delete_suggestion/${sid}/?key=${loggedIn}`;
    
      ResidentService.deleteSuggestion(urlWithPrivateKey, sid)
        .then(() => {
          console.log("Suggestion deleted successfully");
          toast.success("Suggestion deleted successfully");
          setTimeout(() => 1000); 
          
          setSuggestions((prevSuggestions) =>
            prevSuggestions.filter((suggestion) => suggestion.sid !== sid)
          );
        })
        .catch((error) => {
          console.error("Error deleting suggestion:", error);
        });
    
  };

  return (
    <div className="suggestion-list-body">
    <ResidentNavbar /> {/* Include your Navbar here */}
    <div className="container "> {/* Use Bootstrap container class */}
    <ToastContainer/>
      <h2 className="mt-4">Suggestion List</h2>
      <table className="table table-striped suggestion-table">
        <thead>
          <tr>
            <th className="suggestion-name-width">Suggestioner Name</th>
            <th className="suggestion-date-width">Date</th>
            <th>Description</th>
            <th className="resident-suggestion-action-width">Actions</th>
          </tr>
        </thead>
        <tbody>
          {suggestions.map((suggestion, index) => (
            <Suggestion
              key={suggestion.sid}
              suggestion={suggestion}
              deleteSuggestion={deleteSuggestion}
              isEvenRow={index % 2 === 0}
            />
          ))}
        </tbody>
      </table>
      </div>
    <FooterComponent /> 
    </div>
  );
};

export default SuggestionList;
