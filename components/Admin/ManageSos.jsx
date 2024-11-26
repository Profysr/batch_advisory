"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import MagicButton from "@/components/Gen/Button";
import DashboardLayout from "@/layout/DashboardLayout";
import Popup from "../Gen/Popup";
import Table from "../Gen/Table";
import EmptyPage from "../Gen/EmptyPage";

// -----------------------------------------------------------------------------------------
//              Start
// -----------------------------------------------------------------------------------------

const ManageSos = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [uploadedData, setUploadedData] = useState(() => {
    const storedData = localStorage.getItem("sosData");
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("sosData", JSON.stringify(uploadedData));
  }, [uploadedData]);

  const thead = useMemo(() => {
    return [
      {
        name: "Course Id",
      },
      {
        name: "Course Title",
      },
      {
        name: "Credit Hours",
      },
      {
        name: "Pre-requisites",
      },
    ];
  }, []);
  const togglePopup = useCallback(() => setShowPopup((prev) => !prev), []);

  const preprocessData = (data) =>
    data.map(({ course_code, course_title, credit_hours, pre_requisites }) => ({
      course_code,
      course_title,
      credit_hours,
      pre_requisites,
    }));

  return (
    <DashboardLayout>
      {uploadedData.length === 0 ? (
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          <EmptyPage />
          <MagicButton title="Add Batch Advisor" handleClick={togglePopup} />

          {showPopup && (
            <Popup
              setUploadedData={setUploadedData}
              setShowPopup={setShowPopup}
            />
          )}
        </div>
      ) : (
        <Table
          data={preprocessData(uploadedData[0])}
          thead={thead}
          title="Scheme of Study"
          key="Scheme of Studies"
        />
      )}
    </DashboardLayout>
  );
};

export default ManageSos;
