"use client";

import { useCallback, useRef, useState } from "react";

// Components
import MagicButton from "@/components/Gen/Button";
import DashboardLayout from "@/layout/PreLayout";
import Popup from "../Gen/Popup";
import Table from "../Gen/Table";
import Link from "next/link";
import Overlay from "../Gen/Overlay";
import { extractSpecificColumns, generateRandomColor } from "@/helper/utility";
import { useAppContext } from "@/context/AppContext";
import { Dropdown } from "../Gen/InputField";
import { v4 as uuidv4 } from "uuid";

export const ManageClasses = () => {
  const { showPopup, dbData, togglePopup, setdbData } = useAppContext();

  const handleFileUpload = (parsedData) => {
    const { classname, students } = parsedData;
    setdbData((prev) => {
      const classExists = prev.classes.some((cls) =>
        cls.classname.toLowerCase().includes(classname.toLowerCase())
      );

      let updatedClasses = [...prev.classes];

      if (!classExists) {
        updatedClasses.push({
          id: `Class${uuidv4()}`,
          classname,
          students: students.map((std) => std.regNo),
        });
      } else {
        console.error(`Class ${id} already exists.`);
      }

      const updatedStudents = [...prev.students];
      students.forEach((student) => {
        const stdExist = updatedStudents.some(
          (std) => std.regNo === student.regNo
        );
        if (!stdExist) {
          updatedStudents.push({
            ...student,
            id: `Student${uuidv4()}`,
          });
        }
      });

      // Return the updated dbData state
      return {
        ...prev,
        classes: updatedClasses,
        students: updatedStudents,
      };
    });
  };

  const getAdvisorById = (advisorId) => {
    const advisor = dbData.advisors.find((adv) => adv.id === advisorId);
    return advisor ? advisor.name : null;
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
            <h3 className="text-xl font-bold text-gray-800 capitalize">
              {curr?.classname}
            </h3>
            <p className="text-sm text-gray-700 capitalize">
              Students: {curr?.students?.length}
            </p>
            <p className="text-sm text-gray-700 capitalize">
              Advisor: {getAdvisorById(curr?.advisorId) || "-"}
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
  const [activeDropdown, setActiveDropdown] = useState(null); // "advisor" or "sos"
  const [notUploaded, setNotUploaded] = useState(true);

  const classData = dbData.classes.find((cls) =>
    cls.id.toLowerCase().includes(slug.toLowerCase())
  );

  const studentsForTable = classData.students.map((studentId) => {
    const students = dbData.students.find(
      (student) => student.regNo === studentId
    );
    // Extract the specific columns from the student object
    return extractSpecificColumns(students, [
      "id",
      "regNo",
      "name",
      "email",
      "password",
    ]);
  });

  const unassignedAdvisors = dbData.advisors.filter(
    (advisor) => !advisor.assignedClass
  );

  const handleSelectAdvisor = (advisorId) => {
    const selectedAdvisor = unassignedAdvisors.find(
      (advisor) => advisor.id === advisorId
    );

    if (!selectedAdvisor) return;

    const updatedClassData = {
      ...classData,
      advisorId,
    };

    setdbData((prev) => ({
      ...prev,
      classes: prev.classes.map((cls) =>
        cls.id === classData.id ? updatedClassData : cls
      ),
      advisors: prev.advisors.map((advisor) =>
        advisor.id === advisorId
          ? { ...advisor, assignedClass: classData.id }
          : advisor
      ),
    }));

    setActiveDropdown(null);
  };

  const handleAssignSOS = (sosId) => {
    const selectedSos = dbData.schemeOfStudy.find((sos) => sos.id === sosId);

    if (!selectedSos) return;

    const updatedClassData = {
      ...classData,
      sosId: selectedSos.id,
    };

    setdbData((prev) => ({
      ...prev,
      classes: prev.classes.map((cls) =>
        cls.id === classData.id ? updatedClassData : cls
      ),
    }));

    setActiveDropdown(null);
  };

  const handleFileUpload = (parsedData) => {
    setdbData((prev) => {
      const updatedResults = [...prev.results];
      const updatedStudents = [...prev.students]; // Make a copy of the students data

      parsedData.forEach((resultEntry) => {
        const { regNo, resultCard } = resultEntry;
        const resultId = uuidv4(); // Generate a unique result ID

        // Add or update the result in the results array
        const studentResultIndex = updatedResults.findIndex(
          (r) => r.regNo === regNo
        );

        if (studentResultIndex === -1) {
          updatedResults.push({
            regNo,
            resultId, // Add resultId when adding new result
            resultCard,
          });
        } else {
          const existingResult = updatedResults[studentResultIndex];
          const updatedResultCard = [...existingResult.resultCard];

          resultCard.forEach((newSemesterResult) => {
            const existingSemesterIndex = updatedResultCard.findIndex(
              (sem) => sem.semester === newSemesterResult.semester
            );

            if (existingSemesterIndex === -1) {
              updatedResultCard.push(newSemesterResult);
            } else {
              updatedResultCard[existingSemesterIndex] = {
                ...updatedResultCard[existingSemesterIndex],
                gpa: newSemesterResult.gpa,
                cgpa: newSemesterResult.cgpa,
              };
            }
          });

          updatedResults[studentResultIndex] = {
            ...existingResult,
            resultCard: updatedResultCard,
          };
        }

        // Add resultId to the respective student object in the students array
        const studentIndex = updatedStudents.findIndex(
          (student) => student.regNo === regNo
        );
        if (studentIndex !== -1) {
          updatedStudents[studentIndex] = {
            ...updatedStudents[studentIndex],
            resultId, // Add the resultId to the student
          };
        }
      });

      return {
        ...prev,
        results: updatedResults,
        students: updatedStudents, // Return the updated students data
      };
    });
    setNotUploaded(false);
  };

  return (
    <DashboardLayout>
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-4">{classData?.classname}</h2>
        <div className="relative">
          {!classData?.advisorId && (
            <>
              <MagicButton
                title="Assign Advisor"
                handleClick={() =>
                  setActiveDropdown((prev) =>
                    prev === "advisor" ? null : "advisor"
                  )
                }
              />
              {activeDropdown === "advisor" && (
                <Dropdown
                  items={unassignedAdvisors}
                  onSelect={handleSelectAdvisor}
                  noItemsText="No available advisors"
                  manageLink="/manage-advisor"
                />
              )}
            </>
          )}

          {classData?.advisorId && !classData?.sosId && (
            <>
              <MagicButton
                title="Assign SOS"
                handleClick={() =>
                  setActiveDropdown((prev) => (prev === "sos" ? null : "sos"))
                }
              />
              {activeDropdown === "sos" && (
                <Dropdown
                  items={dbData.schemeOfStudy}
                  onSelect={handleAssignSOS}
                  noItemsText="No available SOS"
                />
              )}
            </>
          )}

          {classData?.advisorId && classData?.sosId && notUploaded && (
            <MagicButton
              title="Upload Class Result"
              handleClick={togglePopup}
            />
          )}
        </div>
      </div>

      {classData?.students?.length > 0 ? (
        <Table
          data={studentsForTable}
          title={`Students of ${classData?.classname}`}
          key={`students-${classData?.classId}`}
        />
      ) : (
        <p className="text-gray-500">No students found for this class.</p>
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
