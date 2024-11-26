"use client";

import MagicButton from "./Button";

const Table = ({
  data,
  thead,
  action,
  title,
  payloadAction,
  titleofButton,
}) => {
  return (
    <div
      className={`max-w-fit bg-transparent border border-black/20 rounded-sm`}
      aria-label="Table"
    >
      {/* Table Header  */}
      <div className="px-6 py-4 flex flex-col justify-start items-start gap-3 sm:flex-row sm:justify-between sm:items-center">
        <div className="text-lg tracking-wide leading-relaxed text-center">
          {title}
        </div>
        {payloadAction === true && (
          <MagicButton title={titleofButton || "Assign Class"} />
        )}
      </div>

      <TableGrid data={data} thead={thead} action={action} />
    </div>
  );
};

export const TableGrid = ({ data, thead, action }) => {
  return (
    <table className="min-w-full block overflow-x-auto" aria-label="TableGrid">
      <thead className="bg-slate-900">
        <tr>
          {thead.map((item, idx) => (
            <th key={idx} scope="col" className="px-6 py-3 text-left">
              <div className="flex items-center gap-x-2">
                <span className="text-sm font-semibold capitalize leading-relaxed tracking-wide text-gray-400">
                  {item.name}
                </span>
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-700" aria-label="TableGrid Body">
        {data.map((currRow, i) => (
          <Tr key={i} data={currRow} action={action} />
        ))}
      </tbody>
    </table>
  );
};

export const Tr = ({ data, action }) => {
  return (
    <tr aria-label="Table Tr">
      {Object.keys(data).map((key, index) => (
        <td key={index} className="w-max whitespace-nowrap">
          <div className="px-6 py-3">
            <span className="block max-w-96 truncate text overflow-hidden text-sm font-semibold ">
              {data[key]}
            </span>
          </div>
        </td>
      ))}
    </tr>
  );
};

export default Table;
