import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { differenceInMinutes } from "date-fns";
import moment from "moment-timezone";

const ScheduleListRow = ({ header, row, startDate, endDate, index, headersLength }) => {
  const getShift = () => {
    const item = row.shifts
      .filter(
        (s) =>
          moment(s.start_time)._d >= moment(startDate)._d &&
          moment(s.end_time)._d <= moment(endDate)._d
      )
      .map((s) => ({
        startDay: moment(s.start_time).day(),
        endDay: moment(s.end_time).day(),
        startDate: moment(s.start_time),
        endDate: moment(s.end_time),
        startTime: moment(s.start_time).format("hh:mm:ss A"),
        endTime: moment(s.end_time).format("hh:mm:ss A"),
        role: s.role,
      }))
      .find((s) => s.startDay === header.value);

    if (!item) return null;

    return item;
  };

  const getDiff = (item) => {
    if (!item) return 0;

    const diff = differenceInMinutes(item.startDate._d, item.endDate._d);

    return Math.abs(diff);
  };

  const getPercentageShift = (item) => {
    if (!item) return 0;

    const diff = Math.floor(getDiff(item) / 60);

    return Math.floor((100 * Math.abs(diff)) / 8);
  };

  const getTimeShift = (item, props) => {
    return (
      <Tooltip {...props}>
        <div className="s-list-row-tip">
          <span>
            <b>Start: </b>
            {item.startTime}
          </span>
          <span>
            <b>End: </b>
            {item.endTime}
          </span>
        </div>
      </Tooltip>
    );
  };

  const getDayDiff = (shift) => {
    const start = parseInt(shift.startDate.format("DD"));
    const end = parseInt(shift.endDate.format("DD"));

    return end - start;
  };

  const shift = getShift();
  const percentage = getPercentageShift(shift);
  const hours = getDiff(shift) / 60;

  if (!shift) return <td></td>;

  return (
    <OverlayTrigger placement="top" overlay={getTimeShift.bind(this, shift)}>
      <td className="has-progress">
        <div className="progress-container">
          <div className="progress">
            <div
              role="progressbar"
              className="progress-bar"
              aria-valuenow={percentage}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{
                width: `${percentage}%`,
                backgroundColor: shift.role.background_colour,
                color: shift.role.text_colour,
              }}
            >
              Hours: {hours}
            </div>
          </div>
        </div>
      </td>
    </OverlayTrigger>
  );
};

export default ScheduleListRow;
