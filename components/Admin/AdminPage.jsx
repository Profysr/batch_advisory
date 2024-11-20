"use client";

import { classDetails } from "@/data/users";
import React, { useState } from "react";
import EmptyPage from "../Gen/EmptyPage";
import MagicButton from "../Gen/Button";
import Link from "next/link";
import DashboardLayout from "@/layout/DashboardLayout";
import { metrics } from "@/data/admin";

export default function AdminPage() {
  const [classes, setClasses] = useState(classDetails);

  return (
    <DashboardLayout>
      {classes.length === 0 ? (
        <div className="w-full flex flex-col gap-4 justify-center items-center">
          <EmptyPage />
          <Link href={"/admin/manage-classes"}>
            <MagicButton title="Add New Class" />
          </Link>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-md hover:shadow-lg transition ${metric.bg}`}
              >
                <div className="flex items-center space-x-4">
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
}
