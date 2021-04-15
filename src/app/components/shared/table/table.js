import React from "react";

import TableHead from "./table.head";
import TableBody from "./table.body";

const Table = ({ headers, rows, onRowRenderer, className }) => {
  return (
    <table className={`table table-striped ${className}`}>
      <TableHead headers={headers} />
      <TableBody
        headers={headers}
        rows={rows}
        onRowRenderer={onRowRenderer}
      />
    </table>
  );
};

export default Table;
