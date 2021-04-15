import React from "react";

import { Table } from "app-component/shared";
import ScheduleListRow from "./schedule.list.row";

const headers = [
  { key: "last_name", label: "Employee" },
  { key: "shifts", label: "Sunday", value: 0 },
  { key: "shifts", label: "Monday", value: 1 },
  { key: "shifts", label: "Tuesday", value: 2 },
  { key: "shifts", label: "Wednesday", value: 3 },
  { key: "shifts", label: "Thursday", value: 4 },
  { key: "shifts", label: "Friday", value: 5 },
  { key: "shifts", label: "Saturday", value: 6 },
];
const ScheduleList = ({ data, startDate, endDate, className }) => {
  const handleRowRenderer = (header, row, index, headersLength) => {
    if (header.key !== "shifts")
      return (
        <td>
          {`${row.first_name} ${row.last_name}`}
        </td>
      );

    return renderShiftBy(header, row, index, headersLength);
  };

  const renderShiftBy = (header, row, index, headersLength) => {
    return <ScheduleListRow {...{ header, row, startDate, endDate, index, headersLength }} />;
  };

  return (
    <div>
      <Table
        className={className}
        headers={headers}
        rows={data}
        onRowRenderer={handleRowRenderer}
      />
    </div>
  );
};

export default ScheduleList;
