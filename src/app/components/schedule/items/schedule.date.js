import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment-timezone";
import { addDays } from "date-fns";

const ScheduleDate = ({ date, setDate }) => {
  const [dt, setDt] = useState({});

  const handleOnChange = (date) => {
    const endDate = addDays(date, 6);

    endDate.setHours(23, 59, 59);
    
    setDate({ startDate: date, endDate });
  };

  useEffect(() => {
    setDt(date);
  }, [date]);

  return (
    <DatePicker
      selected={dt.startDate}
      startDate={dt.startDate}
      endDate={dt.endDate}
      onChange={handleOnChange}
    />
  );
};

export default ScheduleDate;
