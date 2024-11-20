"use client";

import Image from "next/image";
// import { SearchInput } from "./CustomInput";

const Table = ({ data, thead, action, title }) => {
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

        {/* <SearchInput placeholder={"Write 3 letters to Search"} /> */}
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
  let content = "";
  return (
    <tr aria-label="Table Tr">
      {Object.keys(data).map((key, index) => {
        switch (key) {
          case "user":
            content = (
              <div className="flex items-center gap-2">
                <Image
                  className="block h-12 w-12 border-2 border-gray-800 p-[2px] rounded-full object-cover"
                  src={data.user.image}
                  alt={data.user.image}
                  width={38}
                  height={38}
                />
                <div className="flex flex-col">
                  <span className="block text-sm font-semibold text-gray-200">
                    {data.user.name}
                  </span>
                  <span className="block text-sm tracking-wide text-gray-200">
                    {data.user.email}
                  </span>
                </div>
              </div>
            );
            break;

          case "status":
            content = (
              <div>
                {data.status === "Approved" && (
                  <span className="inline-flex items-center justify-center rounded-full px-2.5 py-0.5 bg-emerald-700 text-emerald-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="-ms-1 me-1.5 h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    <p className="whitespace-nowrap text-xs">Approved</p>
                  </span>
                )}
                {data.status === "Pending" && (
                  <span className="inline-flex items-center justify-center rounded-full px-2.5 py-0.5  bg-amber-700 text-amber-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="-ms-1 me-1.5 h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z"
                      />
                    </svg>

                    <p className="whitespace-nowrap text-xs">Pending</p>
                  </span>
                )}
                {data.status === "Rejected" && (
                  <span className="inline-flex items-center justify-center rounded-full px-2.5 py-0.5  bg-red-700 text-red-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="-ms-1 me-1.5 h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>

                    <p className="whitespace-nowrap text-xs">Rejected</p>
                  </span>
                )}
              </div>
            );
            break;

          default:
            content = (
              <span className="block max-w-96 truncate text overflow-hidden text-sm font-semibold ">
                {data[key]}
              </span>
            );
        }

        return (
          <td key={index} className="w-max whitespace-nowrap">
            <div className="px-6 py-3">{content}</div>
          </td>
        );
      })}
    </tr>
  );
};

export default Table;
