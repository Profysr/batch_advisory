import React from "react";

const Loader = () => {
  return (
    <div
      className="loader w-12 h-12 rounded-full border-8 border-transparent border-r-[#ffa50097] relative"
      style={{
        animation: "l24 1s infinite linear",
      }}
    >
      <div
        className="absolute inset-[-8px] rounded-full border-8 border-transparent border-r-[#ffa50097]"
        style={{
          animation: "l24 2s infinite linear",
        }}
      ></div>
      <div
        className="absolute inset-[-8px] rounded-full border-8 border-transparent border-r-[#ffa50097]"
        style={{
          animation: "l24 4s infinite linear",
        }}
      ></div>
    </div>
  );
};

export default Loader;
