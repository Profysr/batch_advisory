import React from "react";
import Table from "../Gen/Table";
import { coursesDataForStudent, coursesHeaderForStudent } from "@/data/users";
import DashboardLayout from "@/layout/PreLayout";
import WelcomeComponent from "../Gen/Welcome";

const StudentPage = () => {
  return (
    <DashboardLayout>
      <WelcomeComponent />
      <Table
        title={"Courses"}
        thead={coursesHeaderForStudent}
        data={coursesDataForStudent}
      />
    </DashboardLayout>
  );
};

export default StudentPage;
