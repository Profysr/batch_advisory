"use client";

import MagicButton from "@/components/Gen/Button";
import EmptyPage from "@/components/Gen/EmptyPage";
import Table from "@/components/Gen/Table";
import DashboardLayout from "@/layout/DashboardLayout";
import { useCallback, useEffect, useMemo, useState } from "react";
import Popup from "../Gen/Popup";

const ManageAdvisors = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [uploadedData, setUploadedData] = useState(() => {
    const storedData = localStorage.getItem("advisorsData");
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("advisorsData", JSON.stringify(uploadedData));
  }, [uploadedData]);

  const thead = useMemo(() => {
    return [
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
        name: "AssignedClass",
      },
      {
        name: "",
      },
    ];
  }, []);

  const togglePopup = useCallback(() => setShowPopup((prev) => !prev), []);

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
          data={uploadedData[0]}
          thead={thead}
          title="Advisor Details"
          key="Advisor Details"
        />
      )}
    </DashboardLayout>
  );
};

export default ManageAdvisors;
