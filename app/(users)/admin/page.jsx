// import React from "react";

// const page = () => {
//   return <div>Admin</div>;
// };

// export default page;

"use client";

import { logoutSession } from "@/helper/serverActions";

export default function Dashboard() {
  return (
    <div>
      <button onClick={() => logoutSession()}>Logout</button>
    </div>
  );
}
