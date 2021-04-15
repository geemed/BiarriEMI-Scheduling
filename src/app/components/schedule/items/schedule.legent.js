import React from "react";

const ScheduleLegend = ({ roles }) => {
  const renderRole = (item, idx) => {
    if (!item) return null;

    return (
      <div className="s-legends-item" key={`legend-${idx}`}>
        <div
          className="s-legends-bar"
          style={{ backgroundColor: item.background_colour }}
        />
        <div className="s-legends-txt">{item.name}</div>
      </div>
    );
  };

  return <div className="s-legends">{(roles || []).map(renderRole)}</div>;
};

export default ScheduleLegend;
