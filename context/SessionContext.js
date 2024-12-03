"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { verifySession } from "@/helper/dal";
import Loader from "@/components/Gen/Loader";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await verifySession();
        setSession(sessionData);
      } catch (error) {
        console.error("Failed to fetch session:", error);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (loading) {
    return (
      <div className="fixed bg-red-400 w-full min-h-screen flex justify-center items-center">
        <Loader />;
      </div>
    );
  }

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
