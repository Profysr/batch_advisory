import { useAppContext } from "@/context/AppContext";
import React from "react";
import WelcomeComponent from "../Gen/Welcome";
import MagicButton from "../Gen/Button";
import { logoutSession } from "@/helper/actions";

const AdvisorPage = () => {
  const handleClick = () => {
    logoutSession();
  };
  return (
    <div>
      <WelcomeComponent />; Advisors Page{" "}
      <MagicButton
        title="Logout"
        type="button"
        otherClasses="!w-full"
        handleClick={handleClick}
      />
    </div>
  );
};

export default AdvisorPage;
