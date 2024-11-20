import { verifySession } from "@/helper/dal";
import { redirect } from "next/navigation";
import AdminPage from "@/components/Admin/AdminPage";
import AdvisorPage from "@/components/Advisor/AdvisorPage";
import StudentPage from "@/components/Student/StudentPage";

const Home = async () => {
  const session = await verifySession();
  const { userRole } = session;

  if (userRole === "admin") {
    // return <AdminPage />;
    redirect("/admin");
  } else if (userRole === "advisor") {
    // return <AdvisorPage />;
    redirect("/advisor");
  } else if (userRole === "student") {
    // return <StudentPage />;
    redirect("/student");
  } else {
    redirect("/auth");
  }
};

export default Home;
