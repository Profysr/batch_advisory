"use client";
import DashboardLayout from "@/layout/DashboardLayout";
import { useEffect, useMemo, useState } from "react";
import Table from "../Gen/Table";

const AdvisorPage = () => {
  const assignedClass = "SP21-BSE-8A";

  const [classData, setClassData] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem("classData"));
    const selectedClass = storedData.find((classItem) =>
      classItem.className.toLowerCase().includes(assignedClass.toLowerCase())
    );

    return selectedClass ? selectedClass : [];
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

  return (
    <DashboardLayout>
      <Table
        data={classData.students || []}
        thead={thead}
        title={classData.className}
        key={classData.className}
      />
    </DashboardLayout>
  );
};

export default AdvisorPage;
