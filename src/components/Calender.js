import React, { useState, useCallback } from "react";
import { Calendar } from "@natscale/react-calendar";
import "./calender.css";

export default function Calender() {
  const [value, setValue] = useState();

  const onChange = useCallback(
    (value) => {
      setValue(value);
    },
    [setValue]
  );

  return (
    <div className="cal" >
      <h1 className="calH1">Calendar</h1>
      <Calendar className="calendar" value={value} onChange={onChange} />
    </div>
  );
}
