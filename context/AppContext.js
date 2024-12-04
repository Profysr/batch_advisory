"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { debounce } from "lodash";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [dbData, setdbData] = useState(null);

  const togglePopup = useCallback(() => setShowPopup((prev) => !prev), []);
  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);
  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);
  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);
  const handleCheckboxChange = (id) =>
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  const handleDivClick = useCallback(() => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.click();
  }, []);

  const fetchData = useCallback(async () => {
    if (dbData) return;

    try {
      const storedData = sessionStorage.getItem("dbData");
      if (storedData) {
        setdbData(JSON.parse(storedData));
      } else {
        const response = await fetch("/api/db");
        if (!response.ok) throw new Error("Failed to fetch data.");
        const data = await response.json();
        sessionStorage.setItem("dbData", JSON.stringify(data));
        setdbData(data);
      }
    } catch (err) {
      console.error("Failed to fetch db.json:", err);
    }
  }, [dbData]);

  const saveData = useCallback(
    debounce(async (data) => {
      try {
        await fetch("/api/db", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch (error) {
        console.error("Failed to post data:", error);
      }
    }, 500),
    []
  );

  const updateData = (newData) => {
    setdbData(newData);
    saveData(newData);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const contextValue = useMemo(
    () => ({
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
      setdbData: updateData,
      isSidebarOpen,
      toggleSidebar,
      handleDivClick,
    }),
    [
      showPopup,
      selectedRows,
      isLoading,
      isDragging,
      dbData,
      isSidebarOpen,
      togglePopup,
      toggleSidebar,
      handleCheckboxChange,
      handleDragOver,
      handleDragLeave,
      handleDivClick,
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
