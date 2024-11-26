import AdminPage from "@/components/Admin/AdminPage";
import AdvisorPage from "@/components/Advisor/AdvisorPage";
import StudentPage from "@/components/Student/StudentPage";
import { verifySession } from "@/helper/dal";
import { redirect } from "next/navigation";

const Home = async () => {
  const { userRole } = await verifySession();

  if (userRole === "admin") {
    return <AdminPage />;
  } else if (userRole === "advisor") {
    return <AdvisorPage />;
  } else if (userRole === "student") {
    return <StudentPage />;
  } else {
    redirect("/auth");
  }
};

export default Home;
