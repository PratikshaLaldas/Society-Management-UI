import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommitteeMemberService from "../services/CommitteeMemberService";
import FooterComponent from "./FooterComponent";
import CommitteeMemberNavbar from "./CommitteeMemberNavbar";
import DeleteConfirmationAlert from "./DeleteConfirmationAlert";
import { FaTrash, FaPencilAlt, FaReply } from "react-icons/fa";
import "../CommitteeViewAllBill.css";
import { toast, ToastContainer } from "react-toastify";

const CommitteeViewAllBill = () => {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("key");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [billToDelete, setBillToDelete] = useState(null); // State to store the event to be deleted


  const [loading, setLoading] = useState(true);
  const [bills, setBills] = useState([]);

  const confirmDeleteBill = (billNo) => {
    // Set the event to delete and show the delete confirmation alert
    setBillToDelete(billNo);
    setShowDeleteConfirmation(true);
  };

  useEffect(() => {
    const urlWithPrivateKey = `http://localhost:8083/committee-member/view-all-bill?key=${loggedIn}`;

    CommitteeMemberService.getAllBills(urlWithPrivateKey)
      .then((response) => {
        console.log("Fetched bills:", response.data);
        setBills(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bills:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDeleteBill = (billNo) => {
    const urlWithPrivateKey = `http://localhost:8083/committee-member/delete-bill/${billNo}?key=${loggedIn}`;

    
      CommitteeMemberService.deleteBill(urlWithPrivateKey, billNo)
        .then(() => {
          console.log("Bill deleted successfully");
          toast.success("Bill deleted successfully");
          setTimeout(() => 1000); 
          setBills((prevBills) => prevBills.filter((bill) => bill.billNo !== billNo));
        })
        .catch((error) => {
          console.error("Error deleting bill:", error);
        }).finally(() => {
          // Close the delete confirmation alert
          setShowDeleteConfirmation(false);
        });
  
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="committee-view-all-bill-body">
    <CommitteeMemberNavbar />
    <div className="container">
      <h2 className="mt-4">Bill List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped committee-view-all-bill-table">
          <thead>
            <tr>
              <th>Resident</th>
              <th className="width-committee-all-bill-period">Period</th>
              <th className="width-maintenance">Maintenance</th>
              <th>Parking</th>
              <th>Security</th>
              <th className="width-committee-all-bill-area">Common Area Utilization</th>
              <th className="width-committee-all-bill-date">Bill Date</th>
              <th className="width-committee-all-bill-date">Due Date</th>
              <th className="width-committee-all-bill-amount">Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.billNo}>
                <td>{`${bill.residentFirstName} ${bill.residentLastName}`}</td>
                <td>{bill.period}</td>
                <td>{bill.maintenanceFee}</td>
                <td>{bill.parkingCharge}</td>
                <td>{bill.securityCharge}</td>
                <td>{bill.commonAreaUtilization}</td>
                <td>{formatDate(bill.date)}</td>
                <td>{formatDate(bill.dueDate)}</td>
                <td>{bill.amount}</td>
                <td>{bill.status}</td>
                <td>
                  {bill.status === "unpaid" && (
                    <> &nbsp; &nbsp;
                      <span
                        className="icon-committee-view-all-bill-edit-button"
                        onClick={() => navigate(`/CommitteeUpdateBill/${bill.billNo}`)}
                      >
                        <FaPencilAlt />
                      </span>
                      <span
                        className="icon-committee-view-all-bill-delete-button"
                        onClick={() => confirmDeleteBill(bill.billNo)}
                      >
                        <FaTrash />
                      </span>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    <FooterComponent />
    {showDeleteConfirmation && (
        <DeleteConfirmationAlert
          message="Are you sure you want to delete this bill?"
          onConfirm={() => handleDeleteBill(billToDelete)}
          onCancel={() => setShowDeleteConfirmation(false)}
          
        />
      )}
  </div>
  );
};

export default CommitteeViewAllBill;
