import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResidentService from "../services/ResidentService";
import FooterComponent from "./FooterComponent";
import ResidentNavbar from "./ResidentNavbar";
import { toast, ToastContainer } from "react-toastify";
import "../ResidentScheduleEvent.css";
import CustomAlert from "./CustomAlert";

const ResidentScheduleEvent = () => {
  const loggedIn = localStorage.getItem("key");
  const navigate = useNavigate();
  const [customAlert, setCustomAlert] = useState(null);

  const [eventDTO, setEventDTO] = useState({
    eventName: "",
    organizerName: "",
    description: "",
    place: "",
    date: "",
    startTime: "",
    hours: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDTO((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleScheduleEvent = () => {
    const urlWithPrivateKey = `http://localhost:8083/residents/schedule_event?key=${loggedIn}`;

    ResidentService.scheduleEvent(urlWithPrivateKey, eventDTO)
      .then(() => {
        console.log("Event scheduled successfully");
        toast.success("Event scheduled successfully");
        setTimeout(() => {
          navigate("/ResidentViewScheduledEvent"); // Navigate to the desired page after the delay
        }, 2000); 
        
      })
      .catch((error) => {
        console.error("Error scheduling event:", error);
        setCustomAlert("The chosen time slot and place is not available.");
      });
  };

  const handleCustomAlertClose = () => {
    // Handle the action to perform after the custom alert is closed
    if (customAlert === "The chosen time slot and place is not available.") {
      navigate("/ResidentViewBookedSlots");
    }
    // Reset the custom alert
    setCustomAlert(null);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="resident-schedule-event">
    <ResidentNavbar />
    <div className="resident-schedule-event-form-container">
      <div className="resident-schedule-event-registerbox">
      <img src="images/scheduleEvent.png" alt="Avatar" className="resident-schedule-event-avatar" />
        <h1>Schedule Event</h1>
        <form>
        <div className="two-fields">
          <div>
            <label>Venue</label>
            <select
              name="place"
              value={eventDTO.place}
              onChange={handleChange}
              required
            >
              <option value="">Select a place</option>
              <option value="Hall">Hall (1000rs per hour)</option>
              <option value="Garden">Garden (1100 rs per hour)</option>
            </select>
          </div>
          <div>
            <label>Event Name</label>
            <input
              type="text"
              name="eventName"
              value={eventDTO.eventName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={eventDTO.description}
              onChange={handleChange}
              required
            />
          </div>
          </div>
          <div className="two-fields">
          <div>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={eventDTO.date}
              onChange={handleChange}
              required
              min={getCurrentDate()} 
            />
          </div>
          <div>
            <label>Start Time</label>
            <input
              type="time"
              name="startTime"
              value={eventDTO.startTime}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Hours</label>
            <input
              type="number"
              name="hours"
              value={eventDTO.hours}
              onChange={handleChange}
              required
              min="1"
            />
          </div>
</div>
          {/* <div>
            <label>Organizer Name</label><br/>
            <input
              type="text"
              name="organizerName"
              value={eventDTO.organizerName}
              onChange={handleChange}
              required
            />
          </div> */}
        

          <div className="resident-schedule-event-button-container">
            <button
              type="button"
              className="resident-schedule-event-button"
              onClick={handleScheduleEvent}
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
    <FooterComponent />
    {customAlert && (
        <CustomAlert
          message={customAlert}
          onClose={handleCustomAlertClose}
        />
      )}
  </div>
  );
};

export default ResidentScheduleEvent;
