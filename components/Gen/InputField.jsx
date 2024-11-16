"use client";
import React, { useEffect, useRef } from "react";

export const InputField = ({
  id,
  name,
  title,
  type,
  placeholder,
  className,
  value,
  onChange,
  onKeyDown,
}) => (
  <div className="flex flex-col gap-2" aria-label="Custom Input Component">
    <label htmlFor={id}>{title}</label>
    <input
      className={`${className} w-full px-2 py-3 rounded-md border-2 border-black-100 placeholder:opacity-75 placeholder:text-xs text-sm focus:outline-none`}
      required
      placeholder={placeholder}
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown} // Add onKeyDown to input
      autoComplete="off"
    />
  </div>
);

export const SearchInput = ({ placeholder }) => {
  return (
    <div
      className="flex gap-4 items-center bg-slate-800 text-gray-400 py-2.5 px-3 rounded-lg w-full max-w-96"
      aria-label="Search Input in CustomInput Component"
    >
      <div className="w-4 h-4 flex justify-center items-center">
        {/* <BsSearch size={16} /> */}
        oo
      </div>
      <input
        type="text"
        id="seachInput"
        name="seachInput"
        className="block w-full text-sm focus:outline-none bg-transparent"
        placeholder={placeholder}
      />
    </div>
  );
};

export const DynamicTextarea = ({
  id,
  name,
  title,
  className,
  placeholder,
  rows,
  value,
  onChange,
}) => {
  // Ref to the textarea element
  const textareaRef = useRef(null);

  // Effect to adjust the height dynamically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scrollHeight
    }
  }, [value]); // Run effect every time content changes

  return (
    <div className="flex flex-col gap-2" aria-label="Custom Input Component">
      <label htmlFor={id}>{title}</label>
      <textarea
        id={id}
        name={name}
        ref={textareaRef}
        value={value}
        onChange={onChange}
        rows={rows} // Initial rows
        placeholder={placeholder}
        className={`${className} w-full px-2 py-3 rounded-md border-2 border-black-100 placeholder:opacity-75 placeholder:text-xs text-sm focus:outline-none`}
      />
    </div>
  );
};
