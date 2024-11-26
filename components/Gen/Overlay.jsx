import React from "react";

const Overlay = ({ handleClick }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-40"
      onClick={handleClick}
    />
  );
};

export default Overlay;
