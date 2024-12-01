"use client";

import { useState } from "react";

// Components
import MagicButton from "@/components/Gen/Button";
import DashboardLayout from "@/layout/DashboardLayout";
import Popup from "../Gen/Popup";
import Table from "../Gen/Table";
import Link from "next/link";
import Overlay from "../Gen/Overlay";
import { generateRandomColor } from "@/helper/utility";
import { useAppContext } from "@/context/AppContext";
import { v4 as uuidv4 } from "uuid";

export const ManageClasses = () => {
  const { showPopup, dbData, togglePopup, setdbData } = useAppContext();

  const handleFileUpload = (parsedData) => {
    const { classname, students } = parsedData;
    setdbData((prevDbData) => {
      const classExists = prevDbData.classes.some(
        (cls) => cls.classname === classname
      );

      let updatedClasses = [...prevDbData.classes];

      if (!classExists) {
        updatedClasses.push({
          id: `Class${uuidv4()}`,
          classname,
          students: students.map((std) => std.regNo),
        });
      } else {
        console.error(`Class ${id} already exists.`);
      }

      const updatedStudents = [...prevDbData.students];
      students.forEach((student) => {
        const userExists = updatedStudents.some(
          (user) => user.regNo === student.regNo
        );
        if (!userExists) {
          updatedStudents.push({
            ...student,
            id: `Student${uuidv4()}`,
          });
        }
      });

      // Return the updated dbData state
      return {
        ...prevDbData,
        classes: updatedClasses,
        students: updatedStudents,
      };
    });
  };

  return (
    <DashboardLayout>
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">Manage Classes</h2>
        <MagicButton title="Add Class" handleClick={togglePopup} />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dbData.classes.map((curr, index) => (
          <div
            key={index}
            className="p-6 rounded-md transition ${metric.bg}"
            style={{
              backgroundColor: generateRandomColor(),
              backdropFilter: "blur(6px)", // Slight blur for a modern feel
            }}
          >
            <h3 className="text-xl font-bold text-gray-800">
              {curr?.classname}
            </h3>
            <p className="text-sm text-gray-700 mt-2">
              Students: {curr?.students?.length}
            </p>
            <p className="text-sm text-gray-700">
              Advisor: {curr?.advisor?.name || "-"}
            </p>
            <Link href={`/manage-classes/${curr?.id}`}>
              <button className="mt-4 px-4 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-900 transition">
                View Details
              </button>
            </Link>
          </div>
        ))}
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

export const ManageIndividualClass = ({ slug }) => {
  const { showPopup, dbData, togglePopup, setdbData } = useAppContext();

  const [classData, setClassData] = useState(() => {
    const selectedClass = dbData.classes.find((classItem) =>
      classItem.id.toLowerCase().includes(slug.toLowerCase())
    );

    if (!selectedClass) return null;

    return selectedClass;
  });

  const unassignedAdvisors = dbData.advisors.filter(
    (advisor) => !advisor.assignedClass
  );

  const handleSelectAdvisor = (advisorId) => {
    const selectedAdvisor = unassignedAdvisors.find(
      (advisor) => advisor.id === advisorId
    );

    const updatedClassData = {
      ...classData,
      advisor: { ...selectedAdvisor, assignedClass: classData.id },
    };

    setClassData(updatedClassData);

    const updatedDbData = {
      ...dbData,
      classes: dbData.classes.map((cls) =>
        cls.id === classData.id ? updatedClassData : cls
      ),
      advisors: dbData.advisors.map((user) =>
        user.id === advisorId ? { ...user, assignedClass: classData.id } : user
      ),
    };

    setdbData(updatedDbData); // Persist the changes in dbData
    togglePopup(); // Close the popup
  };
  return (
    <DashboardLayout>
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">{classData?.classname}</h2>
        <div className="relative">
          {classData?.advisor ? (
            <MagicButton
              title="Upload Class Result"
              handleClick={togglePopup}
            />
          ) : (
            <MagicButton title="Assign Advisor" handleClick={togglePopup} />
          )}

          {showPopup && (
            <>
              <div className="absolute mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-48 z-50">
                <ul className="py-1">
                  {unassignedAdvisors?.length > 0 ? (
                    unassignedAdvisors?.map((advisor, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelectAdvisor(advisor.id)}
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      >
                        {advisor.name}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2">
                      No available advisors. Visit the{" "}
                      <Link
                        href="/manage-advisor"
                        className="underline font-medium"
                      >
                        Manage Advisors Page
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
              <Overlay />
            </>
          )}
        </div>
      </div>

      {classData?.students?.length > 0 ? (
        <Table
          data={classData?.students}
          title={`Students of ${classData?.classname}`}
          key={`students-${classData?.classId}`}
        />
      ) : (
        <p className="text-gray-500">No students found for this class.</p>
      )}
    </DashboardLayout>
  );
};
