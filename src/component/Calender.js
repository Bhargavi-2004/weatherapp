import React from "react";
import "../css/calender.css";
import CIcon from "@coreui/icons-react";
import { cilArrowThickLeft, cilArrowThickRight } from "@coreui/icons";

function Calender() {
  const daysContainer = document.querySelector(".days"),
    prevBtn = document.querySelector("#ic1"),
    nextBtn = document.querySelector("#ic2"),
    monthContainer = document.querySelector(".month");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  // Get year and month
  const date = new date();

  let currentmonth = date.getMonth();
  let currentYear = date.getYear();

  // function to rener days:
  function renderDays() {
    
  }

  return (
    <>
      <div className="cont">
        <div className="header-cal">Calender</div>
        <div className="calender">
          <div className="month">
            <div>January 2024</div>
            <a id="ic1">
              <CIcon icon={cilArrowThickLeft} className="icon-cal" />
            </a>
            <a id="ic2">
              <CIcon icon={cilArrowThickRight} className="icon-cal" />
            </a>
          </div>
          <div className="weekdays">
            <div className="day">Sun</div>
            <div className="day">Mon</div>
            <div className="day">Tue</div>
            <div className="day">Wed</div>
            <div className="day">Thu</div>
            <div className="day">Fri</div>
            <div className="day">Sat</div>
          </div>
          <div className="days">{/* using js */}</div>
        </div>
      </div>
    </>
  );
}

export default Calender;
