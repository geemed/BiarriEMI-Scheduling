import React from "react";

const TableRow = ({ header, row, onRowRenderer, index, headersLength }) => {
  if (typeof onRowRenderer === "function")
    return onRowRenderer.call(this, header, row, index, headersLength);

  return <td>{item}</td>;
};

export default TableRow;
