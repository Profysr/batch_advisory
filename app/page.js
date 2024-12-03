"use client";
// app/page.js
import AdminPage from "@/components/Admin/AdminPage";
import AdvisorPage from "@/components/Advisor/AdvisorPage";
import StudentPage from "@/components/Student/StudentPage";
import { useSession } from "@/context/SessionContext";
import Link from "next/link";

export default function page() {
  const { session } = useSession();

  if (!session) {
    return <div>Please log in to access this page.</div>;
  }

  switch (session.userRole) {
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
            Return to{" "}
            <Link className="underline" href={"/auth"}>
              Login
            </Link>
          </p>
        </div>
      );
  }
}
