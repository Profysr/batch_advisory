// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { verifySession } from "@/helper/dal";

// const SessionContext = createContext();

// export const SessionProvider = ({ children }) => {
//   const [session, setSession] = useState(null);

//   useEffect(() => {
//     const fetchSession = async () => {
//       try {
//         const sessionData = await verifySession();
//         setSession(sessionData);
//       } catch (error) {
//         console.error("Failed to fetch session:", error);
//         setSession(null);
//       }
//     };

//     fetchSession();
//   }, []);

//   return (
//     <SessionContext.Provider value={{ session }}>
//       {children}
//     </SessionContext.Provider>
//   );
// };

// export const useSession = () => useContext(SessionContext);

"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { verifySession } from "@/helper/dal";
import Loader from "@/components/Gen/Loader";
import Link from "next/link";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      // console.time("Session Fetch Time");
      try {
        console.log("Session Context Fetching Session Data Starts");
        const sessionData = await verifySession();
        setSession(sessionData);
      } catch (err) {
        setSession(null);
      } finally {
        // console.timeEnd("Session Fetch Time"); // End debugging timer
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  const memoizedSession = useMemo(() => {
    console.log("Memo Session Run");
    return session;
  }, [session]);

  if (loading) return <Loader />;

  if (!memoizedSession)
    return (
      <div>
        Your currently session has been expired. Please login again{" "}
        <Link className="underline" href={"/auth"}>
          Login
        </Link>{" "}
      </div>
    );

  if (!loading && memoizedSession) {
    return (
      <SessionContext.Provider value={{ memoizedSession }}>
        {children}
      </SessionContext.Provider>
    );
  }
};

// Custom hook to consume session context
export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
};
