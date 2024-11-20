"use client";

import MagicButton from "@/components/Gen/Button";
import EmptyPage from "@/components/Gen/EmptyPage";
import Table from "@/components/Gen/Table";
import { advisorsData } from "@/data/admin";
import DashboardLayout from "@/layout/DashboardLayout";
import { useMemo, useState } from "react";

// Add this array of available classes
const availableClasses = [
  "SP21-8A",
  "SP21-8B",
  "FA21-8A",
  "FA21-8B",
  "SP22-8A",
  "SP22-8B",
];

// -----------------------------------------------------------------------------------------
//              Start
// -----------------------------------------------------------------------------------------

const ManageAdvisors = () => {
  const [advisors, setAdvisors] = useState(advisorsData);

  // const thead = useMemo(() => {
  //   return ["", "Name", "Email", "Password", "AssignedClass", ""];
  // }, []);
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

  return (
    <DashboardLayout>
      {advisors.length === 0 ? (
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          <EmptyPage />
          <MagicButton title="Add Batch Advisor" />
        </div>
      ) : (
        <Table
          data={advisors}
          thead={thead}
          title="Advisor Details"
          key="Advisor Details"
        />
      )}
    </DashboardLayout>
  );
};

export default ManageAdvisors;
