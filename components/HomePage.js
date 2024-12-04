"use client";

import Link from "next/link";
import AdminPage from "./Admin/AdminPage";
import AdvisorPage from "./Advisor/AdvisorPage";
import StudentPage from "./Student/StudentPage";
import { useSession } from "@/context/SessionContext";
// import Loader from "./Gen/Loader";

export default function HomePage() {
  const { memoizedSession } = useSession();

  // if (loading) return <Loader />;
  // if (!memoizedSession) {
  //   return <div>Please log in to access this page.</div>;
  // }

  switch (memoizedSession.role) {
    case "admin":
      return <AdminPage />;
    case "advisor":
      return <AdvisorPage />;
    case "student":
      return <StudentPage />;
    default:
      return (
        <div className="grid place-items-center text-lg font-medium">
          Unauthorized Access.
          <p>
            Return to
            <Link className="underline" href={"/auth"}>
              Login
            </Link>
          </p>
        </div>
      );
  }
}
