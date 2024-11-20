"use client";

import { logoutSession } from "@/helper/actions";

export default function AdvisorPage() {
  return (
    <div>
      Advisor
      <button onClick={() => logoutSession()}>Logout</button>
    </div>
  );
}
