import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import Calendar from "@toast-ui/react-calendar";
import _ from "lodash";
import {
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
  format,
} from "date-fns";

import ScheduleLegend from "./items/schedule.legent";

const ScheduleCalendar = ({ roles, shifts, employees }) => {
  const ref = useRef();
  const [date, setDate] = useState();
  const [view, setView] = useState("month");

  const calendars = roles.map((s) => ({
    id: s.id,
    name: s.name,
    color: s.text_colour,
    bgColor: s.background_colour,
    borderColor: s.background_colour,
  }));

  const schedules = _.chain(shifts)
    .map((obj) => _.assign(obj, _.find(employees, { id: obj.employee_id })))
    .map((s) => ({
      id: s.id,
      calendarId: s.role_id,
      title: `${s.first_name} ${s.last_name}`,
      category: "time",
      dueDateClass: "",
      start: new Date(s.start_time),
      end: new Date(s.end_time),
      isReadOnly: false,
    }))
    .value();

  schedules.push({
    id: 1,
    calendarId: 1,
    title: `Gyzelle Medina`,
    category: "time",
    dueDateClass: "",
    start: new Date("2018-06-17 10:00"),
    end: new Date("2018-06-17 19:00"),
    isReadOnly: false,
  });

  const setCalendarDate = (date) => {
    const instance = ref.current.getInstance();

    instance.setDate(date);

    setDate(instance.getDate());
  };

  const getCalendarDate = (isNext) => {
    switch (view) {
      case "day":
        return isNext ? addDays(date.toDate(), 1) : subDays(date.toDate(), 1);
      case "week":
        return isNext ? addWeeks(date.toDate(), 1) : subWeeks(date.toDate(), 1);
      case "month":
        return isNext
          ? addMonths(date.toDate(), 1)
          : subMonths(date.toDate(), 1);
    }
  };

  const handleNextPrev = (isNext) => {
    return setCalendarDate(getCalendarDate(isNext));
  };

  const handleView = (v) => {
    setView(v);
  };

  useEffect(() => {
    if (ref.current) return setCalendarDate("2018-06-01");
  }, [ref]);

  return (
    <div>
      <h3 className="s-heading">
        {date ? format(date.toDate(), "MMM dd, yyyy") : ""}
      </h3>
      <ButtonGroup className="btn-group-np">
        <Button
          variant="outline-dark"
          size="sm"
          onClick={handleNextPrev.bind(null, false)}
        >
          <i className="fa fa-angle-left" /> Prev
        </Button>
        <Button
          variant="outline-dark"
          size="sm"
          onClick={handleNextPrev.bind(null, true)}
        >
          Next <i className="fa fa-angle-right" />
        </Button>
      </ButtonGroup>
      <br />
      <ButtonGroup className="btn-group-view">
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={handleView.bind(null, "day")}
        >
          Day
        </Button>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={handleView.bind(null, "week")}
        >
          Week
        </Button>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={handleView.bind(null, "month")}
        >
          Month
        </Button>
      </ButtonGroup>
      <ScheduleLegend roles={roles} />
      <Calendar
        ref={ref}
        height="800px"
        calendars={calendars}
        view={view}
        disableClick={false}
        disableDblClick={false}
        schedules={schedules}
        month={{
          startDayOfWeek: 0,
        }}
        week={{
          startDayOfWeek: 0,
          workweek: 3,
        }}
        template={{
          allday(schedule) {
            const time = `${format(
              schedule.start.toDate(),
              "hh:mm a"
            )} - ${format(schedule.end.toDate(), "hh:mm a")}`;
            return `<div class="s-detail s-detail-${view}" style="background-color: ${schedule.bgColor}"><b>${schedule.title}</b><div>${time}</div></div>`;
          },
          time(schedule) {
            const time = `${format(
              schedule.start.toDate(),
              "hh:mm a"
            )} - ${format(schedule.end.toDate(), "hh:mm a")}`;
            return `<div class="s-detail s-detail-${view}" style="background-color: ${schedule.bgColor}"><b>${schedule.title}</b><div>${time}</div></div>`;
          },
        }}
      />
    </div>
  );
};

export default ScheduleCalendar;
