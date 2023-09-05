import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommitteeMemberService from "../services/CommitteeMemberService";
import FooterComponent from "./FooterComponent";
import CommitteeMemberNavbar from "./CommitteeMemberNavbar";
import "../CommitteeViewScheduledEvent.css";
import DeleteConfirmationAlert from "./DeleteConfirmationAlert";
import { FaPencilAlt, FaTrash} from "react-icons/fa"; 
import { toast, ToastContainer } from "react-toastify";

const CommitteeViewScheduledEvent = () => {
  const loggedIn = localStorage.getItem("key");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [scheduledEvents, setScheduledEvents] = useState([]);
  const currentDate = new Date();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null); // State to store the event to be deleted


  useEffect(() => {
    const urlWithPrivateKey = `http://localhost:8083/committee-member/view_scheduled_event?key=${loggedIn}`;

    CommitteeMemberService.viewScheduledEvents(urlWithPrivateKey)
      .then((response) => {
        console.log("Fetched scheduled events:", response.data);
        setScheduledEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching scheduled events:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const confirmDeleteEvent = (eventId) => {
    // Set the event to delete and show the delete confirmation alert
    setEventToDelete(eventId);
    setShowDeleteConfirmation(true);
  };

  // Event deletion logic
  const handleDeleteEvent = (eventId) => {
    const urlWithPrivateKey = `http://localhost:8083/committee-member/delete_event/${eventId}?key=${loggedIn}`;

      CommitteeMemberService.deleteEvent(urlWithPrivateKey, eventId)
        .then(() => {
          console.log("Event deleted successfully");
          toast.success("Event deleted successfully");
          setTimeout(() => 1000); 
          setScheduledEvents((prevEvents) =>
            prevEvents.filter((event) => event.eventId !== eventId)
          );
        })
        .catch((error) => {
          console.error("Error deleting event:", error);
        }).finally(() => {
          // Close the delete confirmation alert
          setShowDeleteConfirmation(false);
        });
    
  };

  // Event update logic
  const handleUpdateEvent = (eventId) => {
    // Navigate to the update page with the appropriate URL
    navigate(`/CommitteeUpdateEvent/${eventId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <div className="committee-view-scheduled-event-body">
      <CommitteeMemberNavbar />
    <div className="container">
      <ToastContainer/>
      <h2 className="mt-4">Committee Scheduled Events</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped committee-view-scheduled-event-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Event</th>
              <th>Description</th>
              <th>Venue</th>
              <th className="width-committee-event-date">Date</th>
              <th className="width-committee-event-time">Start Time</th>
              <th className="width-committee-event-time">End Time</th>
              <th>Hours</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scheduledEvents.map((event) => (
              <tr key={event.eventId}>
                <td>{event.organizerName}</td>
                <td>{event.eventName}</td>
                <td>{event.description}</td>
                <td>{event.place}</td>
                <td>{formatDate(event.date)}</td>
                <td>{event.startTime}</td>
                <td>{event.endTime}</td>
                <td>{event.hours}</td>
                <td>
                  {new Date(event.date) >= currentDate && (
                    // <React.Fragment>
                    //   <button onClick={() => handleUpdateEvent(event.eventId)}>
                    //     Update
                    //   </button>
                    //   <button onClick={() => handleDeleteEvent(event.eventId)}>
                    //     Delete
                    //   </button>
                    // </React.Fragment>
                    <React.Fragment>
                      &nbsp;
              <span
                  className="icon-committee-scheduled-event-edit-event-button"
                  onClick={() => handleUpdateEvent(event.eventId)}
                >
                  <FaPencilAlt />
                </span>
                <span
                  className="icon-committee-scheduled-event-delete-event-button"
                  onClick={() => confirmDeleteEvent(event.eventId)}
                >
                  <FaTrash />
                </span>
            </React.Fragment>
                  )}
           

                </td>
              </tr>
             
            ))}
          </tbody>
        </table>
      )}
    </div>
    <FooterComponent/>
    {showDeleteConfirmation && (
        <DeleteConfirmationAlert
          message="Are you sure you want to delete this event?"
          onConfirm={() => handleDeleteEvent(eventToDelete)}
          onCancel={() => setShowDeleteConfirmation(false)}
          
        />
      )}
    </div>

 

  );
};

export default CommitteeViewScheduledEvent;
