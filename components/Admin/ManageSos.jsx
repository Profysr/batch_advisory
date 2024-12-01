"use client";

import MagicButton from "@/components/Gen/Button";
import DashboardLayout from "@/layout/DashboardLayout";
import Popup from "../Gen/Popup";
import Table from "../Gen/Table";
import EmptyPage from "../Gen/EmptyPage";
import { useAppContext } from "@/context/AppContext";
import Overlay from "../Gen/Overlay";
import { v4 as uuidv4 } from "uuid";

// -----------------------------------------------------------------------------------------
//              Start
// -----------------------------------------------------------------------------------------

const ManageSos = () => {
  const { showPopup, togglePopup, dbData, setdbData } = useAppContext();

  const handleFileUpload = (parsedData) => {
    const { id, sos_name, courses } = parsedData;

    setdbData((prevDbData) => {
      const sosExists = prevDbData.schemeOfStudy.some((sos) => sos.id === id);
      let updatedSchemeOfStudy = [...prevDbData.schemeOfStudy];

      if (!sosExists) {
        updatedSchemeOfStudy.push({
          id: `sos${uuidv4()}`,
          sos_name,
          courses: courses.map((c) => c.id),
        });
      } else {
        updatedSchemeOfStudy = updatedSchemeOfStudy.map((sos) => {
          if (sos.id === id) {
            const updatedCourses = Array.from(
              new Set([...sos.courses, ...courses.map((c) => c.id)])
            );
            return { ...sos, courses: updatedCourses };
          }
          return sos;
        });
      }

      // Update courses
      const updatedCourses = [...prevDbData.courses];
      courses.forEach((course) => {
        const courseExists = updatedCourses.some((c) => c.id === course.id);
        if (!courseExists) {
          updatedCourses.push(course);
        }
      });

      // Return updated dbData
      return {
        ...prevDbData,
        schemeOfStudy: updatedSchemeOfStudy,
        courses: updatedCourses,
      };
    });
  };

  const getTableData = (data, sos_name) => {
    const sos = data.schemeOfStudy.find((s) => s.sos_name === sos_name);

    if (!sos) {
      return []; // Return an empty array if SoS doesn't exist
    }

    // Map course codes in the SoS to their full details from data.courses
    return sos.courses.map((cId) => {
      const course = data.courses.find((c) => c.id === cId);
      return {
        "Course Code": course?.courseCode,
        "Course Title": course?.course_title,
        "Credit Hours": course?.credit_hours,
        "Pre-Requisites": course?.pre_requisites,
      };
    });
  };

  // Fetch data for the SoS with a specific ID
  const sos_name = "computer science";
  const tableData = getTableData(dbData, sos_name);

  return (
    <DashboardLayout>
      {tableData.length > 0 ? (
        <>
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-bold">Schemes of Study</h1>
            <MagicButton title="Upload New SOS" handleClick={togglePopup} />
          </div>
          <Table
            data={tableData}
            title={`Scheme of Study for ${sos_name}`}
            key={`Scheme of Study for ${sos_name}`}
          />
        </>
      ) : (
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          <EmptyPage />
          <MagicButton title="Add SOS" handleClick={togglePopup} />
        </div>
      )}
      {showPopup && (
        <>
          <Popup handleFileUpload={handleFileUpload} />
          <Overlay />
        </>
      )}
    </DashboardLayout>
  );
};

export default ManageSos;
