import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "app-base/app.context";

import ScheduleCalendar from "./schedule.calendar";
import * as actions from "./schedule.action";

const Schedule = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { employees, shifts, roles } = useSelector((state) => state.schedule);

  const getEmployees = useCallback(async () => {
    const res = await actions.get();

    setTimeout(() => {
      dispatch(res);
    }, 500);
  });

  useEffect(() => {
    if (!employees && !shifts && !roles) return getEmployees();

    return setLoading(false);
  }, [employees, shifts, roles]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="schedule">
      <ScheduleCalendar roles={roles} shifts={shifts} employees={employees} />
    </div>
  );
};

export default Schedule;
