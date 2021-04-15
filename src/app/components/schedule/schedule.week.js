import React, { useCallback, useEffect, useState } from "react";
import moment from "moment-timezone";
import { addDays } from "date-fns";
import _ from "lodash";

import { useDispatch, useSelector } from "app-base/app.context";

import ScheduleDate from "./items/schedule.date";
import ScheduleLegend from "./items/schedule.legent";
import ScheduleList from "./list/schedule.list";

import * as actions from "./schedule.action";

const Schedule = () => {
  const dispatch = useDispatch();
  const date = moment("2018-06-17");

  const { employees, shifts, roles, data } = useSelector(
    (state) => state.schedule
  );
  const [datePicker, setDatePicker] = useState({
    startDate: moment(date).startOf("day")._d,
    endDate: addDays(moment(date).endOf("day")._d, 6),
  });

  const getEmployees = useCallback(async () => {
    const res = await actions.get();

    dispatch(res);
  });

  const renderDate = (label, date) => {
    return (
      <span>
        <b>{label}: </b>
        {moment(date).format("MMMM Do YYYY, h:mm:ss")}
      </span>
    );
  };

  useEffect(() => {
    if (!employees && !shifts && !roles) return getEmployees();
  }, [employees, shifts, roles]);

  return (
    <div className="schedule">
      <div className="s-header">
        <div className="s-date">
          {renderDate("Start", datePicker.startDate)}
          {renderDate("End", datePicker.endDate)}
        </div>
        <ScheduleDate date={datePicker} setDate={setDatePicker} />
      </div>
      <ScheduleLegend roles={roles} />

      <ScheduleList
        className="s-list"
        data={data}
        startDate={datePicker.startDate}
        endDate={datePicker.endDate}
      />
    </div>
  );
};

export default Schedule;
