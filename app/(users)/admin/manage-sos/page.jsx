"use client";

import { useState } from "react";
import MagicButton from "@/components/Gen/Button";
import Link from "next/link";
import DashboardLayout from "@/layout/DashboardLayout";

// -----------------------------------------------------------------------------------------
//              Start
// -----------------------------------------------------------------------------------------
const SOS = [
  {
    programName: "CS",
  },
  {
    programName: "ME",
  },
  {
    programName: "EE",
  },
  {
    programName: "BBA",
  },
];

const ManageSos = () => {
  const [uploadedData, setUploadedData] = useState(SOS);
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 w-full">
        <div className="w-full flex justify-between items-center p-2">
          <h2 className="text-2xl font-semibold mb-4">
            Manage Scheme of Studies
          </h2>
          <MagicButton title="Upload SOS" />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uploadedData.map((sos, index) => (
            <div
              key={index}
              className="p-4 border rounded-md shadow-sm hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">{sos.programName}</h3>

              <Link href={`/admin/manage-sos/${sos.programName}`}>
                <button className="mt-4 px-4 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageSos;
