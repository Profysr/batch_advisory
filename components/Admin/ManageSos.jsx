"use client";

import MagicButton from "@/components/Gen/Button";
import DashboardLayout from "@/layout/PreLayout";
import Popup from "../Gen/Popup";
import Table from "../Gen/Table";
import { useAppContext } from "@/context/AppContext";
import Overlay from "../Gen/Overlay";
import { v4 as uuidv4 } from "uuid";
import { generateRandomColor } from "@/helper/utility";
import Link from "next/link";

export const ManageSos = () => {
  const { showPopup, togglePopup, dbData, setdbData } = useAppContext();

  const handleFileUpload = (parsedData) => {
    const { name, courses } = parsedData;

    setdbData((prevDbData) => {
      const sosExists = prevDbData.schemeOfStudy.some((sos) =>
        sos.name.toLowerCase().includes(name.toLowerCase())
      );
      let updatedSchemeOfStudy = [...prevDbData.schemeOfStudy];

      if (!sosExists) {
        updatedSchemeOfStudy.push({
          id: `sos${uuidv4()}`,
          name,
          courses: courses.map((c) => c.id),
        });
      } else {
        console.log(`SOS for ${name} already uploaded`);
      }

      // Update courses
      const updatedCourses = [...prevDbData.courses];
      courses.forEach((course) => {
        const courseExists = updatedCourses.some((c) => c.id === course.id);
        if (!courseExists) {
          updatedCourses.push(course);
        }
      });

      return {
        ...prevDbData,
        schemeOfStudy: updatedSchemeOfStudy,
        courses: updatedCourses,
      };
    });
  };

  return (
    <DashboardLayout>
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold">Schemes of Study</h1>
        <MagicButton title="Upload New SOS" handleClick={togglePopup} />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dbData.schemeOfStudy.map((sos) => {
          const totalCourses = sos?.courses?.length;
          return (
            <div
              key={sos.id}
              className="border rounded-lg p-4 shadow-sm"
              style={{
                backgroundColor: generateRandomColor(),
                backdropFilter: "blur(6px)", // Slight blur for a modern feel
              }}
            >
              <h2 className="font-bold text-lg capitalize">{sos?.name}</h2>
              <p className="text-sm text-gray-700 capitalize">
                Total Courses: {totalCourses || "-"}
              </p>

              <Link href={`/manage-sos/${sos?.id}`}>
                <button className="mt-4 px-4 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-900 transition">
                  View SOS
                </button>
              </Link>
            </div>
          );
        })}
      </div>
      {showPopup && (
        <>
          <Popup handleFileUpload={handleFileUpload} />
          <Overlay />
        </>
      )}
    </DashboardLayout>
  );
};

export const ManageIndividualSos = ({ slug }) => {
  const { dbData, selectedRows, setSelectedRows, setdbData } = useAppContext();

  const sos = dbData.schemeOfStudy.find((s) => s.id === slug);

  if (!sos) {
    return (
      <p className="text-gray-500 font-medium text-base grid place-items-center">
        Scheme of Study not found.
      </p>
    );
  }

  // Map the courses associated with the SOS
  const courses = sos.courses.map((courseId) =>
    dbData.courses.find((course) => course.id === courseId)
  );

  const handleConfirmCourses = () => {
    setdbData((prevDbData) => {
      if (selectedRows.length === 0) {
        console.log("No courses selected for confirmation.");
        return prevDbData;
      }

      const updatedCourses = prevDbData.courses.map((course) => {
        if (selectedRows.includes(course.id)) {
          return { ...course, offer: true };
        }
        return course;
      });

      // Check if any courses has been updated
      const anyUpdates = updatedCourses.some((course) => {
        selectedRows.includes(course.id) && course.offer === true;
      });

      setSelectedRows([]);
      if (anyUpdates) {
        console.log("Courses have been confirmed successfully.");
      } else {
        console.log("No changes made, please try again.");
      }

      return {
        ...prevDbData,
        courses: updatedCourses,
      };
    });
  };

  const actionBtns = (
    <div className="flex gap-3">
      <MagicButton
        title={"Offered by University"}
        handleClick={handleConfirmCourses}
        disabledCondition={selectedRows.length === 0}
      />
    </div>
  );

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold capitalize">
        Scheme of Study for {sos.name}
      </h1>
      <Table
        data={courses.map((course) => ({
          id: course?.courseCode,
          "Course Code": course?.courseCode,
          "Course Title": course?.courseTitle,
          "Credit Hours": course?.creditHours,
          "Pre-Requisites": course?.preRequisites,
          Offered: course?.offer === true ? "✅" : null,
        }))}
        key={`courses-${sos.id}`}
        checkBoxOption={true}
        actionBtns={actionBtns}
      />
    </DashboardLayout>
  );
};
