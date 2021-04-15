import React from "react";

const TableHead = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((s, i) => (
          <th key={`th-${i}`}>{s.label}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
