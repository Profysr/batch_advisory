import React, { useCallback, useState, useEffect } from "react";
import WelcomeComponent from "../Gen/Welcome";
import Table from "../Gen/Table";
import { useSession } from "@/context/SessionContext";
import DashboardLayout from "@/layout/PreLayout";
import MagicButton from "../Gen/Button";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { extractSpecificColumns } from "@/helper/utility";

const AdvisorPage = () => {
  const { memoizedSession } = useSession();
  const { dbData } = useAppContext();
  const [data, setData] = useState(() => {
    const storedData = sessionStorage.getItem("DataforAdvisorPage");
    return storedData ? JSON.parse(storedData) : null;
  });
  const router = useRouter();

  const getData = useCallback(() => {
    if (!memoizedSession || !dbData) return;

    // Check if the advisor has an assigned class
    const assignedClassId = memoizedSession.assignedClass;
    if (!assignedClassId) {
      // console.log("No class assigned to this advisor.");
      setData(null);
      sessionStorage.removeItem("DataforAdvisorPage"); // Clear sessionStorage for this scenario
      return;
    }
    console.log("Class ID found in the session.");

    // Check if data is already in sessionStorage
    const storedData = sessionStorage.getItem("DataforAdvisorPage");
    if (storedData) {
      console.log("Data found in sessionStorage.");
      setData(JSON.parse(storedData));
      return;
    }
    console.log("Data not found in sessionStorage. Fetching new data.");

    try {
      // Find the assigned class
      const assignedClass = dbData.classes.find(
        (cls) => cls.id === assignedClassId
      );

      if (!assignedClass) {
        console.warn("No assigned class found for this advisor.");
        setData(null);
        sessionStorage.removeItem("DataforAdvisorPage"); // Clear sessionStorage
        return;
      }

      // Fetch students in the assigned class
      const studentsInClass = assignedClass.students.map((regNo) =>
        dbData.students.find((student) => student.regNo === regNo)
      );

      const studentsWithDetails = studentsInClass.map((student) => {
        if (!student) return null;

        const result = dbData.results.find(
          (res) => res.regNo === student.regNo
        );

        if (!result) {
          return {
            ...student,
            cgpa: null,
            failedCourses: [],
            enrolledCourses: [],
          };
        }

        const mostRecentCgpa =
          result.resultCard?.[result.resultCard.length - 1]?.cgpa || null;

        const failedCourses = result.resultCard.reduce((failed, semester) => {
          semester.courses.forEach((course) => {
            if (course.marks < 50) failed.push(course.courseCode);
          });
          return failed;
        }, []);

        const enrolledCourses = result.resultCard.reduce(
          (courses, semester) => {
            semester.courses.forEach((course) => {
              if (!courses.includes(course.courseCode)) {
                courses.push(course.courseCode);
              }
            });
            return courses;
          },
          []
        );

        return {
          id: student.id,
          regNo: student.regNo,
          name: student.name,
          cgpa: mostRecentCgpa,
          failedCourses: failedCourses.length ? failedCourses : null,
          enrolledCourses,
        };
      });

      const schemeOfStudy = dbData.schemeOfStudy.find(
        (sos) => sos.id === assignedClass.sosId
      );

      const finalData = {
        className: assignedClass.classname,
        students: studentsWithDetails.filter(Boolean),
        schemeOfStudy: schemeOfStudy || null,
      };

      setData(finalData);

      // Store data in sessionStorage
      sessionStorage.setItem("DataforAdvisorPage", JSON.stringify(finalData));
      console.log("Data stored in sessionStorage.");
    } catch (error) {
      console.error("Error fetching advisor data:", error);
      setData(null);
      sessionStorage.removeItem("DataforAdvisorPage"); // Clear sessionStorage on error
    }
  }, [memoizedSession, dbData]);

  // Fetch data if not already available
  useEffect(() => {
    getData();
  }, [getData]);

  const isFailed = (data) =>
    data.failedCourses && data.failedCourses.length > 0;

  const handleAssignSosClick = () => {
    router.push("/assign-sos");
  };

  const studentsForTable = data?.students?.map((std) =>
    extractSpecificColumns(std, [
      "id",
      "regNo",
      "name",
      "cgpa",
      "failedCourses",
    ])
  );

  return (
    <DashboardLayout>
      <WelcomeComponent />
      {data ? (
        <Table
          data={studentsForTable}
          title={data.className}
          key={data.className}
          rowCondition={isFailed}
          actionBtns={
            <MagicButton
              title="Assign SOS"
              handleClick={handleAssignSosClick}
            />
          }
        />
      ) : (
        <p>No assigned class found for this advisor.</p>
      )}
    </DashboardLayout>
  );
};

export default AdvisorPage;
