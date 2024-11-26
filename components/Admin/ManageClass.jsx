"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

// Components
import MagicButton from "@/components/Gen/Button";
import DashboardLayout from "@/layout/DashboardLayout";
import Popup from "../Gen/Popup";
import Table from "../Gen/Table";
import Link from "next/link";
import Overlay from "../Gen/Overlay";

export const ManageClasses = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [uploadedData, setUploadedData] = useState(() => {
    const storedData = localStorage.getItem("classData");
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("classData", JSON.stringify(uploadedData));
  }, [uploadedData]);

  const togglePopup = useCallback(() => setShowPopup((prev) => !prev), []);

  return (
    <DashboardLayout>
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">Manage Classes</h2>
        <MagicButton title="Add Class" handleClick={togglePopup} />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uploadedData.map((curr, index) => (
          <div
            key={index}
            className="p-4 border rounded-md shadow-sm hover:shadow-md"
          >
            <h3 className="text-lg font-semibold">{curr.className}</h3>
            <p className="text-sm text-gray-500">
              Students: {curr.students.length}
            </p>
            <p className="text-sm text-gray-500">
              Advisor: {curr.batchAdvisor.name || "Unassigned"}
            </p>
            <Link href={`/manage-classes/${curr.className}`}>
              <button className="mt-4 px-4 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>

      {showPopup && (
        <Popup setUploadedData={setUploadedData} setShowPopup={setShowPopup} />
      )}
    </DashboardLayout>
  );
};

export const ManageIndividualClass = ({ slug }) => {
  const [classData, setClassData] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("classData"));
    const selectedClass = storedData.find((classItem) =>
      classItem.className.toLowerCase().includes(slug.toLowerCase())
    );

    return selectedClass ? selectedClass : [];
  });

  // for assign batch advisor button
  const [showPopup, setShowPopup] = useState(false);
  const [advisorsData, setAdvisorsData] = useState(() => {
    const storedData = localStorage.getItem("advisorsData");
    return storedData ? JSON.parse(storedData) : [];
  });

  const thead = useMemo(() => {
    return [
      { name: "Reg#" },
      {
        name: "Name",
      },
      {
        name: "Email",
      },
      {
        name: "Password",
      },
      {
        name: "",
      },
    ];
  }, []);
  const theadForAdvisors = useMemo(() => {
    return [
      {
        name: "Name",
      },
      {
        name: "Email",
      },

      {
        name: "",
      },
    ];
  }, []);

  const togglePopup = useCallback(() => setShowPopup((prev) => !prev), []);

  const extractDataForTable = (data) => {
    return data.map((item) => ({
      name: item.name,
      email: item.email,
    }));
  };

  return (
    <DashboardLayout>
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">{classData.className}</h2>

        {/* Button Starts */}
        <div className="relative">
          <MagicButton title={"Assign Advisor"} handleClick={togglePopup} />

          {showPopup && (
            <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 py-10 max-h-[75%] overflow-y-auto">
              <Table
                data={extractDataForTable(advisorsData[0])}
                thead={theadForAdvisors}
                title="Available Advisors"
                key="Available Advisors"
                payloadAction={true}
                titleofButton={"Confirm Advisor"}
              />
            </div>
          )}
        </div>
        {/* Button Ends */}

        {showPopup && <Overlay handleClick={togglePopup} />}
      </div>
      <Table
        data={classData.students || []}
        thead={thead}
        title={classData.className}
        key={classData.className}
      />
    </DashboardLayout>
  );
};
