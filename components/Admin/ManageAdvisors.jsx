"use client";

import MagicButton from "@/components/Gen/Button";
import EmptyPage from "@/components/Gen/EmptyPage";
import DashboardLayout from "@/layout/PreLayout";
import Popup from "../Gen/Popup";
import { useAppContext } from "@/context/AppContext";
import Overlay from "../Gen/Overlay";
import { v4 as uuidv4 } from "uuid";
import TableComponent from "@/components/Gen/Table";

const ManageAdvisors = () => {
  const { showPopup, dbData, setdbData, togglePopup } = useAppContext();

  const handleFileUpload = (parsedData) => {
    console.log("clicked");

    setdbData((prev) => {
      const updatedAdvisors = [...prev.advisors];

      parsedData.forEach((advisor) => {
        const advisorExists = updatedAdvisors.some(
          (existingAdvisor) => existingAdvisor.email === advisor.email
        );

        if (!advisorExists) {
          updatedAdvisors.push({
            ...advisor,
            assignedClass: advisor.assignedClass || null,
            id: `Advisor${uuidv4()}`,
          });
        } else {
          console.warn(`Advisor with email ${advisor.email} already exists.`);
        }
      });

      return {
        ...prev,
        advisors: updatedAdvisors,
      };
    });
  };

  const getClassnameById = (classId) => {
    const classData = dbData?.classes?.find((cls) => cls.id === classId);
    return classData ? classData.classname : null;
  };

  // Map through the advisors and add their class name
  const advisorsWithClassname = dbData?.advisors?.map((advisor) => ({
    ...advisor,
    assignedClass: getClassnameById(advisor.assignedClass),
  }));

  return (
    <DashboardLayout>
      {advisorsWithClassname?.length > 0 ? (
        <TableComponent
          data={advisorsWithClassname}
          title="Batch Advisors"
          key="Batch Advisors"
        />
      ) : (
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          <EmptyPage />
          <MagicButton title="Add Batch Advisor" handleClick={togglePopup} />

          {showPopup && (
            <>
              <Overlay />
              <Popup handleFileUpload={handleFileUpload} />
            </>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default ManageAdvisors;
