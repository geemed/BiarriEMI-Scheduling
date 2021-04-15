import React from "react";

import TableRow from "./table.row";

const TableBody = ({ headers, rows, onRowRenderer }) => {
  const renderRow = (row, header, idx) => {
    return (
      <TableRow
        key={`row-${idx}`}
        row={row}
        header={header}
        index={idx}
        headersLength={headers.length}
        onRowRenderer={onRowRenderer}
      />
    );
  };

  const renderData = (row, idx) => {
    return (
      <tr key={`data-${idx}`}>{headers.map(renderRow.bind(this, row))}</tr>
    );
  };

  return <tbody>{(rows || []).map(renderData)}</tbody>;
};

export default TableBody;
