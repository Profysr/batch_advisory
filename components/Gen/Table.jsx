"use client";

import { useState } from "react";

const TableComponent = ({
  data,
  title,
  actionBtn,
  actionBtnTitle,
  checkBoxOption = false,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div
      className="max-w-fit bg-transparent border border-black/20 rounded-sm"
      aria-label="Table"
    >
      {/* Table Header */}
      <div className="px-6 py-4 flex flex-col justify-start items-start gap-3 sm:flex-row sm:justify-between sm:items-center">
        <div className="text-lg tracking-wide leading-relaxed text-center capitalize">
          {title}
        </div>
        {checkBoxOption && selectedRows.length > 0 && (
          <div className="flex gap-3">
            <button className="bg-yellow-600 text-white text-sm  px-4 py-2 rounded-sm">
              Edit
            </button>
            <button className="bg-red-700 text-white text-sm  px-4 py-2 rounded-sm">
              Delete
            </button>
          </div>
        )}
        {actionBtn && (
          <button className="inline-flex h-full cursor-pointer items-center justify-center rounded-[4px] bg-slate-950 px-6 py-2 text-sm text-white">
            {actionBtnTitle}
          </button>
        )}
      </div>

      <TableGrid
        data={data}
        onCheckboxChange={handleCheckboxChange}
        selectedRows={selectedRows}
        checkBoxOption={checkBoxOption}
      />
    </div>
  );
};

export const TableGrid = ({
  data,
  onCheckboxChange,
  selectedRows,
  checkBoxOption,
}) => {
  const keys = Object.keys(data[0]);

  const excludeKeys = ["id", "role", "status"];
  // Filter out excluded keys
  const thead = keys.filter((key) => !excludeKeys.includes(key));
  return (
    <table className="min-w-full block overflow-x-auto" aria-label="TableGrid">
      <thead className="bg-slate-900">
        <tr>
          {checkBoxOption ? (
            <th scope="col" className="px-6 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-semibold capitalize leading-relaxed tracking-wide text-gray-400"></span>
              </div>
            </th>
          ) : (
            <th scope="col" className="px-6 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-semibold capitalize leading-relaxed tracking-wide text-gray-400">
                  No
                </span>
              </div>
            </th>
          )}

          {thead.map((item, idx) => (
            <th key={idx} scope="col" className="px-6 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-semibold capitalize leading-relaxed tracking-wide text-gray-400">
                  {item}
                </span>
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-700" aria-label="TableGrid Body">
        {data.map((currRow, i) => (
          <Tr
            key={i}
            index={i + 1}
            data={currRow}
            onCheckboxChange={onCheckboxChange}
            isSelected={selectedRows.includes(currRow.id)}
            checkBoxOption={checkBoxOption}
          />
        ))}
      </tbody>
    </table>
  );
};

export const Tr = ({
  index,
  data,
  onCheckboxChange,
  isSelected,
  checkBoxOption,
}) => {
  const excludeKeys = ["id", "role", "status"];
  return (
    <tr aria-label="Table Row">
      {checkBoxOption ? (
        <td className="px-6 py-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onCheckboxChange(data.id)}
            className="h-4 w-4  cursor-pointer accent-green-600 border-gray-300 rounded focus:ring-green-500"
            aria-label={`Select row ${data.id}`}
          />
        </td>
      ) : (
        <td key={index} className="w-max whitespace-nowrap">
          <div className="px-6 py-3">
            <span className="block max-w-96 truncate text overflow-hidden text-sm font-semibold">
              {index}
            </span>
          </div>
        </td>
      )}

      {Object.entries(data)
        .filter(([key]) => !excludeKeys.includes(key))
        .map(([key, value], index) => (
          <td key={index} className="w-max whitespace-nowrap">
            <div className="px-6 py-3">
              <span className="block max-w-96 truncate text overflow-hidden text-sm font-semibold">
                {value !== null && value !== undefined && value !== ""
                  ? value
                  : "-"}
              </span>
            </div>
          </td>
        ))}
    </tr>
  );
};

export default TableComponent;
