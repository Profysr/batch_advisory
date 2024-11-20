"use client";
// pages/manage-classes.js
import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

// Components
import { InputField } from "@/components/Gen/InputField";
import MagicButton from "@/components/Gen/Button";
import DashboardLayout from "@/layout/DashboardLayout";
import { classDetails } from "@/data/users";
import Link from "next/link";

// -----------------------------------------------------------------------------------------
//              Start
// -----------------------------------------------------------------------------------------

const PopupContent = ({
  onClose,
  onSubmit,
  className,
  setClassName,
  onFileUpload,
}) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
    aria-label=""
  >
    <div className="bg-white/25 p-8 rounded-md shadow-md w-96 relative">
      <button
        className="absolute top-2 right-2 text-4xl font-bold text-white"
        onClick={onClose}
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold mb-4 text-white">Add New Class</h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        <InputField
          id="class name"
          name="class name"
          title="Class Name"
          type="text"
          placeholder="SP21-BSE-004"
          className="uppercase"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <div>
          <input
            type="file"
            accept=".json"
            onChange={onFileUpload}
            className="text-white"
          />
        </div>
        <MagicButton title="Add Class" type="submit" />
      </form>
    </div>
  </div>
);

const ManageClasses = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [classes, setClasses] = useState(classDetails);
  const [uploadedData, setUploadedData] = useState([]);
  const [className, setClassName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedClasses = localStorage.getItem("classes");
    // Test 1
    if (storedClasses) {
      setClasses(JSON.parse(storedClasses));
    }
  }, []);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    // Test 2
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);
        setUploadedData(jsonData);
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };
    reader.readAsText(file);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const newClass = {
        name: className,
        chartData: getChartData(uploadedData),
        data: uploadedData,
      };
      setClasses((prevClasses) => {
        const updatedClasses = [...prevClasses, newClass];
        localStorage.setItem("classes", JSON.stringify(updatedClasses));
        return updatedClasses;
      });
      setShowPopup(false);
      setClassName("");
    },
    [className, uploadedData]
  );

  const togglePopup = useCallback(() => setShowPopup((prev) => !prev), []);

  return (
    <>
      <DashboardLayout>
        <div className="w-full flex justify-between items-center px-2">
          <h2 className="text-2xl font-semibold mb-4">Manage Classes</h2>
          <MagicButton title="Add Class" handleClick={togglePopup} />
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls, index) => (
            <div
              key={index}
              className="p-4 border rounded-md shadow-sm hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">{cls.name}</h3>
              <p className="text-sm text-gray-500">
                Students: {cls.studentCount}
              </p>
              <p className="text-sm text-gray-500">
                Advisor: {cls.advisorName || "Unassigned"}
              </p>
              <Link href={`/admin/manage-classes/${cls.name}`}>
                <button className="mt-4 px-4 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </DashboardLayout>

      {showPopup && (
        <PopupContent
          onClose={togglePopup}
          onSubmit={handleSubmit}
          className={className}
          setClassName={setClassName}
          onFileUpload={handleFileUpload}
        />
      )}
    </>
  );
};

export default ManageClasses;
