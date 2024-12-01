import Header from "@/components/Gen/Header";
import React from "react";

const DashboardLayout = ({ children, otherClasses }) => {
  return (
    <div className="relative" aria-label="Dashboard Layout">
      <div className="w-full min-h-screen flex flex-col gap-6">
        <Header />
        <div className="relative">
          <div className="w-full h-full max-w-screen-xl mx-auto px-4 py-12">
            <div
              className={`flex flex-col  justify-center items-center ${
                otherClasses ? otherClasses : ""
              }`}
              style={{ gap: "2rem" }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
