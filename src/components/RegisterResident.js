import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import residentService from "../services/ResidentService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import NavbarComponent from "./NavbarComponent";
//import FooterComponent from "./FooterComponent";
import "../RegisterResident.css";

const RegisterResident = () => {
  const [resident, setResident] = useState({
    email: "",
    fName: "",
    mInit: "",
    lName: "",
    wingNo: "",
    flatNo: "",
    floorNo: "",
    memberCount: "",
    twoWheelerCount: "",
    fourWheelerCount: "",
    birthYear: null,

    
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResident((prevResident) => ({
      ...prevResident,
      [name]: value,
    }));
  };

  const handleBirthYearChange = (date) => {
    const selectedYear = date.getFullYear();
    setResident((prevResident) => ({
      ...prevResident,
      birthYear: selectedYear,
    }));
  };
  
  const validateEmail = () => {
    const emailInput = document.querySelector('input[name="email"]');
    const emailError = document.getElementById('email-error');

    // Regular expression to match valid email formats
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|edu\.in|edu\.com)$/i;

    if (!emailPattern.test(emailInput.value)) {
      emailError.textContent = "Invalid email address. Please use a valid domain (gmail.com, yahoo.com, edu.in, edu.com).";
      emailInput.setCustomValidity("Invalid");
    } else {
      emailError.textContent = "";
      emailInput.setCustomValidity(""); // Clear the custom validity message
    }
  };
  const registerResident = (e) => {
    e.preventDefault();
    residentService
      .registerResident(resident)
      .then(() => {
        console.log("Resident registered successfully");
        toast.success("Resident Registered Successfully");
        setTimeout(() => {
          navigate("/Login"); // Navigate to the desired page after the delay
        }, 2000); // Navigate to the desired page
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setResident({
      email: "",
      fName: "",
      mInit: "",
      lName: "",
      wingNo: "",
      flatNo: "",
      floorNo: "",
      memberCount: "",
      twoWheelerCount: "",
      fourWheelerCount: "",
      birthYear: null,
    });
  };

  return (
    <div className="resident-body">

<ToastContainer/>
      <div className="resident-form-container">
        <div className="registerbox">
        <img src="images/avatar.jpg" alt="Avatar" className="avatar" />
          <h1 className="register-h1">Register</h1>
          <form onSubmit={registerResident}>
            <p>Email</p>
            <input
              type="email"
              name="email"
              value={resident.email}
              onChange={handleChange}
              placeholder="Enter Email"
              required
              onBlur={validateEmail}
            />
            <div id="email-error" className="error-text"></div>


<div>
        <div className="input-row">
        <div className="input-group">
            <p>First Name</p>
            <input
              type="text"
              name="fName"
              value={resident.fName}
              onChange={handleChange}
              placeholder="Enter First Name"
              required
            />
         </div>   
         <div className="input-group">
            <p>Middle Initial</p>
            <input
              type="text"
              name="mInit"
              value={resident.mInit}
              onChange={handleChange}
              placeholder="Enter Middle Initial"
            />
        </div>
        <div className="input-group">
            <p>Last Name</p>
            <input
              type="text"
              name="lName"
              value={resident.lName}
              onChange={handleChange}
              placeholder="Enter Last Name"
              required
            />
        </div>
        </div>
        <div className="input-row">
        <div className="input-group" style={{ flex: 1 }}>
            <p>Wing No</p>
          <select
            name="wingNo"
            value={resident.wingNo}
            onChange={handleChange}
            required
          >
            <option value="">Select Wing No</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select> 
          </div>
          <div className="input-group" style={{ flex: 1 }}>
            <p>Flat No</p>
            {/* <input
              type="text"
              name="flatNo"
              value={resident.flatNo}
              onChange={handleChange}
              placeholder="Enter Flat No"
              required
            /> */}

      <select
            name="flatNo"
            value={resident.flatNo}
            onChange={handleChange}
            required
          >
            <option value="">Select Flat No</option>
            <option value="101">101</option>
            <option value="102">102</option>
            <option value="103">103</option>
            <option value="101">201</option>
            <option value="102">202</option>
            <option value="103">203</option>
            <option value="101">301</option>
            <option value="102">302</option>
            <option value="103">303</option>
          </select>

            
            </div>
            <div className="input-group" style={{ flex: 1 }}>
            <p>Floor</p>
            {/* <input
              type="text"
              name="floorNo"
              value={resident.floorNo}
              onChange={handleChange}
              placeholder="Enter Floor No"
              required
            /> */}
            <select
            name="floorNo"
            value={resident.floorNo}
            onChange={handleChange}
            required
          >
            <option value="">Select Floor No</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
            </div>
            </div>
            <div className="input-row">
            <div className="input-group">
            <p>Member Count</p>
            <input
              type="number"
              name="memberCount"
              value={resident.memberCount}
              onChange={handleChange}
              placeholder="Enter Member Count"
              required
              min="1"
              max="15"
            />
            </div>
            <div className="input-group">
            <p>Two Wheeler Count</p>
            <input
              type="number"
              name="twoWheelerCount"
              value={resident.twoWheelerCount}
              onChange={handleChange}
              placeholder="Enter Two Wheeler Count"
              required
              min="0"
              max="10"
            />
            </div>
            <div className="input-group">
            <p>Four Wheeler Count</p>
            <input
              type="number"
              name="fourWheelerCount"
              value={resident.fourWheelerCount}
              onChange={handleChange}
              placeholder="Enter Four Wheeler Count"
              required
              min="0"
              max="10"
            />
            </div>
         
            <div className="input-group birth-margin">
            <p>Birth Year</p>
            <div className="input-with-note">
            <DatePicker className="birth-year-picker"
                selected={resident.birthYear ? new Date(resident.birthYear, 0, 1) : null}
                onChange={(date) => handleBirthYearChange(date)}
                dateFormat="yyyy"
                showYearPicker
                minDate={new Date("1940-01-01")}
                maxDate={new Date("2006-12-31")}
                placeholderText="Select Birth Year"
                required
                />
                <div className="note">Note: You must be above age 18 to register</div>     
                </div>
                </div>
                         
         </div>
         </div>
         
        <div>
        <div className="button-container">
              <button type="submit" className="register-button">
                Register
              </button>
              <button onClick={reset} className="clear-button">
                Clear
              </button>
            </div>
        </div>
        </form>
        </div>
       
      </div>
    </div>
  );
};

export default RegisterResident;
