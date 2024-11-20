import React from "react";
import Table from "../Gen/Table";
import { coursesDataForStudent, coursesHeaderForStudent } from "@/data/users";
import DashboardLayout from "@/layout/DashboardLayout";

const StudentPage = () => {
  return (
    <DashboardLayout>
      <Table
        title={"Courses"}
        thead={coursesHeaderForStudent}
        data={coursesDataForStudent}
      />
    </DashboardLayout>
  );
};

export default StudentPage;
