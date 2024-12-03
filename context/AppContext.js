"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { debounce } from "lodash";
import Loader from "@/components/Gen/Loader";
import { useRouter } from "next/navigation";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [dbData, setdbData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { refresh } = useRouter();

  const togglePopup = () => setShowPopup((prev) => !prev);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  // Handle file input trigger when clicking on the div
  const handleDivClick = useCallback(() => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click(); // Trigger the file input click
    }
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Fetch initial data from the static file via the API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/db");
        if (!response.ok) throw new Error("Failed to fetch data.");
        const data = await response.json();

        setdbData(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch db.json:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Save dbData to the file whenever it changes
  const saveData = debounce(async (data) => {
    try {
      await fetch("/api/db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  }, 1000);

  useEffect(() => {
    if (dbData) {
      saveData(dbData);
    }
  }, [dbData]);

  if (loading) {
    return (
      <div className="fixed w-full min-h-screen flex justify-center items-center">
        <Loader />;
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed w-full min-h-screen flex flex-col justify-center items-center">
        <p className="text-red-500 text-xl font-medium">Error: {error}</p>
        <button
          className="mt-4 px-4 py-2 underline text-black rounded"
          onClick={refresh}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{
        showPopup,
        setShowPopup,
        togglePopup,
        selectedRows,
        setSelectedRows,
        handleCheckboxChange,
        isLoading,
        setIsLoading,
        isDragging,
        setIsDragging,
        handleDragOver,
        handleDragLeave,
        dbData,
        setdbData,
        isSidebarOpen,
        toggleSidebar,
        handleDivClick,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
