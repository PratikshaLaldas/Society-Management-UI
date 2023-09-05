import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResidentService from "../services/ResidentService";
import Complaint from "./Complaint";
import ResidentNavbar from "./ResidentNavbar";
import "../ComplaintList.css";
import FooterComponent from "./FooterComponent";
import { toast, ToastContainer } from "react-toastify";

const ComplaintList = () => {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("key");

  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const urlWithPrivateKey = `http://localhost:8083/residents/view_all_complaints/?key=${loggedIn}`;
    
    ResidentService.getAllComplaints(urlWithPrivateKey)
      .then((response) => {
        console.log("Fetched complaints:", response.data);
        setComplaints(response.data);
      })
      .catch((error) => {
        console.error("Error fetching complaints:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  const deleteComplaint = (cid) => {
    const urlWithPrivateKey = `http://localhost:8083/residents/delete_complaint/${cid}/?key=${loggedIn}`;
    
 
      ResidentService.deleteComplaint(urlWithPrivateKey, cid)
        .then(() => {
          console.log("Complaint deleted successfully");
          toast.success("Complaint deleted successfully");
          setTimeout(() => 1000); 
          setComplaints((prevComplaints) =>
            prevComplaints.filter((complaint) => complaint.cid !== cid)
          );
        })
        .catch((error) => {
          console.error("Error deleting complaint:", error);
        });
  };

  return (
    <div className="complaint-list-body">
    <ResidentNavbar /> {/* Include your Navbar here */}
    <div className="container "> {/* Use Bootstrap container class */}
    <ToastContainer/>
      <h2 className="mt-4">Complaint List</h2>
      <table className="table table-striped complaint-table">
        <thead>
          <tr>
            <th className="resident-complaint-name-width">Complainer Name</th>
            <th className="resident-complaint-date-width" >Date</th>
            <th className="resident-complaint-description-width">Complaint Description</th>
            <th className="resident-complaint-solution-width">Solution Message</th>
            <th className="resident-complaint-action-width">Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint, index) => (
            <Complaint
              key={complaint.cid}
              complaint={complaint}
              deleteComplaint={deleteComplaint}
              isEvenRow={index % 2 === 0}
            />
          ))}
        </tbody>
      </table>
    </div>
    <FooterComponent /> {/* Include your Footer here */}
  </div>
  );
};

export default ComplaintList;
