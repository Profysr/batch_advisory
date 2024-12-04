"use client";
import DashboardLayout from "@/layout/PreLayout";
import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import TableComponent from "../Gen/Table";

const AssignSos = () => {
  // const { dbData } = useAppContext();
  const [data, setData] = useState(() => {
    const storedData = sessionStorage.getItem("DataforAdvisorPage");
    return storedData ? JSON.parse(storedData) : null;
  });

  console.log(data);

  return (
    <DashboardLayout>
      {/* <TableComponent
        data={dbData?.courses?.map((course) => ({
          id: course?.courseCode,
          "Course Code": course?.courseCode,
          "Course Title": course?.courseTitle,
          "Credit Hours": course?.creditHours,
          "Pre-Requisites": course?.preRequisites,
        }))}
        checkBoxOption={true}
      /> */}
      Assign
    </DashboardLayout>
  );
};

export default AssignSos;
