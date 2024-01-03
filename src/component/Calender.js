import React from "react";
import "../css/calender.css";
import CIcon from "@coreui/icons-react";
import { cilArrowThickLeft, cilArrowThickRight } from "@coreui/icons";

function Calender() {

  return (
    <>
      <div className="cont">
        <div className="header-cal">Calender</div>
        <div className="calender">
          <div className="month">
            <div className="currentmonth">Januanry 2023</div>
            <a id="ic1">
              <CIcon icon={cilArrowThickLeft} className="icon-cal prevBtn" />
            </a>
            <a id="ic2">
              <CIcon icon={cilArrowThickRight} className="icon-cal nextBtn" />
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

// https://github.com/opensource-coding/Dynamic-Calendar-in-HTML-CSS-JavaScript/blob/main/index.html

export default Calender;
