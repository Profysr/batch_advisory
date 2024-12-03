"use client";

import DashboardLayout from "@/layout/PreLayout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EmptyPage from "../Gen/EmptyPage";
import MagicButton from "../Gen/Button";
import { useAppContext } from "@/context/AppContext";
import WelcomeComponent from "../Gen/Welcome";

const AdminPage = () => {
  const { dbData } = useAppContext();
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const calculateMetrics = () => {
      const classData = dbData.classes; // Assuming dbData has a classes property
      const advisorsData = dbData.advisors; // Assuming dbData has an advisors property

      if (!classData || !advisorsData) {
        console.log("Class data or advisors data is missing.");
        return [];
      }

      // Calculating totals
      const totalClasses = classData.length;
      const totalBatchAdvisors = advisorsData.length;

      const totalStudents = classData.reduce(
        (sum, item) => sum + (item.students?.length || 0),
        0
      );

      // Create metrics array
      return [
        {
          title: "Total Classes",
          count: totalClasses,
          svg: (
            <svg
              className="w-6 h-6 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10h11m-9 4h9M4 6h16M5 20h14a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2z"
              />
            </svg>
          ),
          bg: "bg-blue-100",
        },
        {
          title: "Total Batch Advisors",
          count: totalBatchAdvisors,
          svg: (
            <svg
              className="w-6 h-6 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ),
          bg: "bg-green-200",
        },
        {
          title: "Uploaded SOS",
          count: 1, // You can adjust this based on your data
          svg: (
            <svg
              className="w-6 h-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16v-8m0 0l-3 3m3-3l3 3M5 20h14a2 2 0 002-2v-4a2 2 0 00-2-2h-3l-2-2m-4-4l-2 2H5a2 2 0 00-2 2v4a2 2 0 002 2z"
              />
            </svg>
          ),
          bg: "bg-gray-200",
        },
        {
          title: "Total Students",
          count: totalStudents,
          svg: (
            <svg
              className="w-6 h-6 text-purple-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 10V3.8a2 2 0 011.514-1.939 18.116 18.116 0 016.075 0A2 2 0 0123 3.8V10M14 10a2 2 0 012 2v9M14 10a2 2 0 00-2 2v9m0-9V3.8a2 2 0 00-1.514-1.939 18.116 18.116 0 00-6.075 0A2 2 0 004 3.8V10m0 0a2 2 0 00-2 2v9m0-9h20"
              />
            </svg>
          ),
          bg: "bg-purple-200",
        },
      ];
    };

    // Calculate and set metrics
    setMetrics(calculateMetrics());
  }, [dbData]); // Re-run when dbData changes

  return (
    <DashboardLayout>
      {metrics.length === 0 ? (
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          <WelcomeComponent />
          <EmptyPage />
          <Link href={"/manage-classes"}>
            <MagicButton title="Go to Add Class Page" />
          </Link>
        </div>
      ) : (
        <>
          <WelcomeComponent />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg flex items-center h-36 shadow-md hover:shadow-lg transition ${metric.bg}`}
              >
                <div className="w-full flex items-center space-x-4">
                  <div>{metric.svg}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      {metric.title}
                    </h3>
                    <p className="text-2xl font-bold text-gray-800">
                      {metric.count}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default AdminPage;
